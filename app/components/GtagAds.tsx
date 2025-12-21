// src/app/components/GtagAds.tsx
'use client'

import Script from 'next/script'
import { useEffect, useMemo, useState } from 'react'
import { CONSENT_EVENT, readConsent } from '@/lib/consent'

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

const ADS_ID = 'AW-17821777313'

function ensureGtagBase() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer!.push(arguments)
    }
}

export function gtagAdsConversion(params: { send_to: string; value?: number; currency?: string }) {
  if (typeof window === 'undefined') return
  if (!window.gtag) return
  window.gtag('event', 'conversion', params)
}

export default function GtagAds() {
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const c = readConsent()
    setMarketing(!!c?.marketing)

    const onUpdate = () => {
      const x = readConsent()
      setMarketing(!!x?.marketing)
    }

    window.addEventListener(CONSENT_EVENT, onUpdate as any)
    return () => window.removeEventListener(CONSENT_EVENT, onUpdate as any)
  }, [])

  const shouldLoad = useMemo(() => marketing === true, [marketing])

  // Wenn Marketing an: Consent Mode setzen + config ausführen
  useEffect(() => {
    if (!shouldLoad) return
    ensureGtagBase()

    // Optional: Consent Mode (v2) – hier "granted", weil Marketing zugestimmt
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'denied', // du nutzt Analytics separat – sonst anpassen
    })

    window.gtag?.('js', new Date())
    window.gtag?.('config', ADS_ID)
  }, [shouldLoad])

  // Wenn Marketing aus: Consent Mode "denied" setzen (sicher)
  useEffect(() => {
    if (shouldLoad) return
    ensureGtagBase()
    window.gtag?.('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    })
  }, [shouldLoad])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        id="gtag-aw"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      {/* gtag init ist bereits im useEffect — Script-Init-Block brauchst du dann nicht nochmal */}
    </>
  )
}
