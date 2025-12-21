// src/app/danke/ConversionFire.tsx
'use client'

import { useEffect } from 'react'
import { readConsent } from '@/lib/consent'
import { gtagAdsConversion } from '@/app/components/GtagAds'

const SEND_TO = 'AW-17821777313/DEIN_LABEL_HIER' // <-- aus Google Ads kopieren

export default function ConversionFire() {
  useEffect(() => {
    const c = readConsent()
    if (!c?.marketing) return

    // ✅ Conversion nur bei Marketing-Consent
    gtagAdsConversion({
      send_to: SEND_TO,
      // optional:
      // value: 1.0,
      // currency: 'EUR',
    })
  }, [])

  return null
}
