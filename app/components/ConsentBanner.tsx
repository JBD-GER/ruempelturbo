'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { readConsent, writeConsent } from '@/lib/consent'

type Mode = 'banner' | 'settings'

const BRAND = {
  accent: '#f9a727',
  openEvent: 'ruempelturbo:open-consent',
}

const DEFAULTS = {
  analytics: false,
  marketing: false,
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function Summary({ analytics, marketing }: { analytics: boolean; marketing: boolean }) {
  const summary = useMemo(() => {
    const parts: string[] = ['Notwendig']
    if (analytics) parts.push('Statistik')
    if (marketing) parts.push('Marketing')
    return parts.join(' · ')
  }, [analytics, marketing])

  return <span className="font-medium text-zinc-900">{summary}</span>
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('banner')

  const [analytics, setAnalytics] = useState(DEFAULTS.analytics)
  const [marketing, setMarketing] = useState(DEFAULTS.marketing)

  // ✅ Open via global event (z.B. Footer-Link)
  useEffect(() => {
    const onOpen = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? DEFAULTS.analytics)
      setMarketing(current?.marketing ?? DEFAULTS.marketing)
      setMode('settings')
      setOpen(true)
    }
    window.addEventListener(BRAND.openEvent, onOpen)
    return () => window.removeEventListener(BRAND.openEvent, onOpen)
  }, [])

  // ✅ initial open (wenn noch nichts gesetzt)
  useEffect(() => {
    const current = readConsent()
    if (!current) {
      setAnalytics(DEFAULTS.analytics)
      setMarketing(DEFAULTS.marketing)
      setMode('banner')
      setOpen(true)
    }
  }, [])

  // ✅ ESC schließt
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // ✅ Scroll lock wenn offen
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function close() {
    setOpen(false)
    setMode('banner')
  }

  function acceptAll() {
    writeConsent({ analytics: true, marketing: true })
    close()
  }

  function rejectAll() {
    writeConsent({ analytics: false, marketing: false })
    close()
  }

  function saveSelection() {
    writeConsent({ analytics, marketing })
    close()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einwilligung"
    >
      {/* Backdrop */}
      <button
        aria-hidden
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        onClick={close}
      />

      {/* Card */}
      <div className="relative w-full max-w-[980px]">
        <div
          className={cx(
            'relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-white/90',
            'shadow-[0_22px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl'
          )}
        >
          {/* subtle accent glow */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-25"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 65%)`,
            }}
          />

          <div className="relative p-4 sm:p-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm backdrop-blur">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: BRAND.accent }}
              />
              Cookie-Einwilligung
            </div>

            <div className="mt-3">
              <div className="text-[18px] font-semibold tracking-tight text-zinc-950 sm:text-[20px]">
                Wir verwenden Cookies & ähnliche Technologien
              </div>

              <p className="mt-2 max-w-[980px] text-[12px] leading-relaxed text-zinc-700 sm:text-[13px]">
                Notwendige Cookies sind für Betrieb und Sicherheit erforderlich. Optional verwenden wir{' '}
                <b>Statistik</b> (z. B. Analytics), um die Nutzung zu verstehen, und <b>Marketing</b>, um Kampagnen
                und Conversions zu messen. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ ändern.
              </p>

              <div className="mt-2 text-[11px] text-zinc-600">
                Aktuell: <Summary analytics={analytics} marketing={marketing} /> ·{' '}
                <Link
                  href="/datenschutz"
                  className="font-semibold text-zinc-900 underline underline-offset-2"
                >
                  Datenschutzerklärung
                </Link>
              </div>
            </div>

            {/* Buttons */}
            {mode === 'banner' ? (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                <button
                  onClick={acceptAll}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-[12px] font-semibold text-black shadow-sm transition hover:opacity-95 sm:w-auto"
                  style={{ backgroundColor: BRAND.accent }}
                >
                  Alle akzeptieren
                </button>

                <button
                  onClick={rejectAll}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-4 text-[12px] font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white sm:w-auto"
                >
                  Ablehnen
                </button>

                <button
                  onClick={() => setMode('settings')}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-4 text-[12px] font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white sm:w-auto"
                >
                  Einstellungen
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <ToggleRow
                    title="Notwendig"
                    description="Betrieb & Sicherheit (immer aktiv)."
                    enabled
                    locked
                    accent={BRAND.accent}
                  />
                  <ToggleRow
                    title="Statistik"
                    description="Nutzung messen (z. B. Analytics)."
                    enabled={analytics}
                    onChange={setAnalytics}
                    accent={BRAND.accent}
                  />
                  <ToggleRow
                    title="Marketing"
                    description="Kampagnen & Conversions messen."
                    enabled={marketing}
                    onChange={setMarketing}
                    accent={BRAND.accent}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                  <button
                    onClick={saveSelection}
                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-[12px] font-semibold text-black shadow-sm transition hover:opacity-95 sm:w-auto"
                    style={{ backgroundColor: BRAND.accent }}
                  >
                    Auswahl speichern
                  </button>

                  <button
                    onClick={() => setMode('banner')}
                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-4 text-[12px] font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white sm:w-auto"
                  >
                    Zurück
                  </button>
                </div>
              </>
            )}

            <div className="mt-3 text-[11px] text-zinc-600">
              Kein Spam · unverbindlich · <span className="font-semibold text-zinc-900">Made in Germany</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/60" />
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  title,
  description,
  enabled,
  locked,
  onChange,
  accent,
}: {
  title: string
  description: string
  enabled: boolean
  locked?: boolean
  onChange?: (v: boolean) => void
  accent: string
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-3 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-zinc-900">{title}</div>
          <div className="mt-1 text-[11px] leading-relaxed text-zinc-600">{description}</div>
        </div>

        <button
          type="button"
          disabled={locked}
          onClick={() => onChange?.(!enabled)}
          className={cx(
            'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition',
            locked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
            'border-black/10',
            enabled ? 'bg-black/10' : 'bg-white'
          )}
          aria-pressed={enabled}
          aria-label={`${title} ${enabled ? 'aktiv' : 'inaktiv'}`}
        >
          {/* track accent (when enabled) */}
          <span
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-0 rounded-full opacity-0 transition',
              enabled && 'opacity-100'
            )}
            style={{
              background: `linear-gradient(90deg, rgba(0,0,0,0.06), ${accent}55)`,
            }}
          />
          <span
            className={cx(
              'relative inline-block h-6 w-6 translate-x-0.5 rounded-full bg-white shadow-sm transition',
              enabled ? 'translate-x-[1.35rem]' : 'translate-x-0.5'
            )}
          />
        </button>
      </div>
    </div>
  )
}
