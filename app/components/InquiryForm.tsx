// src/app/components/InquiryForm.tsx
'use client'

import { useMemo, useState } from 'react'

const ACCENT = '#f9a727'

type ApiErr = {
  ok: false
  error?: string
  details?: string
  errors?: Record<string, string>
}

type ApiOk = {
  ok: true
  sentCustomer: boolean
}

type CustomerType = 'privat' | 'gewerbe' | ''

export default function InquiryForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<ApiOk | null>(null)
  const [err, setErr] = useState<ApiErr | null>(null)

  const [customerType, setCustomerType] = useState<CustomerType>('') // ✅ Pflicht
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [dsgvo, setDsgvo] = useState(false)

  // Honeypot (unsichtbar)
  const [website, setWebsite] = useState('')

  const hasEmail = useMemo(() => email.trim().length > 0, [email])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOk(null)
    setErr(null)
    setLoading(true)

    try {
      const res = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerType,
          firstName,
          lastName,
          phone,
          email: email || undefined,
          location,
          message,
          dsgvo,
          website,
        }),
      })

      const data = (await res.json()) as ApiOk | ApiErr

      if (!res.ok || (data as any).ok === false) {
        setErr(data as ApiErr)
      } else {
        setOk(data as ApiOk)
        // reset
        setCustomerType('')
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setLocation('')
        setMessage('')
        setDsgvo(false)
        setWebsite('')
      }
    } catch (e: any) {
      setErr({ ok: false, error: 'Netzwerkfehler', details: String(e?.message || e) })
    } finally {
      setLoading(false)
    }
  }

  const fieldError = (k: string) => err?.errors?.[k]
  const canSubmit = customerType !== '' && dsgvo && !loading

  return (
    // ✅ WICHTIG:
    // Mobile: keine "Hintergrund-Kiste" (kein border/rounding/shadow, kein overflow-hidden)
    // Ab sm: Card-Design wie vorher
    <div
      className={[
        'relative',
        'p-0 sm:p-5 md:p-6',
        'bg-transparent sm:bg-white/80',
        'border-0 sm:border sm:border-black/10',
        'rounded-none sm:rounded-[28px]',
        'shadow-none sm:shadow-[0_30px_90px_-35px_rgba(0,0,0,0.35)]',
        'backdrop-blur-0 sm:backdrop-blur-xl',
        'overflow-visible sm:overflow-hidden',
      ].join(' ')}
    >
      {/* FX — nur ab sm, sonst drückt es am Handy optisch alles zusammen */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 hidden h-56 w-56 rounded-full blur-3xl opacity-40 sm:block"
        style={{ background: `radial-gradient(circle at 40% 40%, ${ACCENT}, transparent 65%)` }}
      />
      <div className="pointer-events-none absolute inset-0 hidden opacity-[0.35] sm:block [mask-image:radial-gradient(50%_60%_at_50%_0%,black,transparent)]">
        <div className="h-full w-full [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:38px_38px]" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Kostenlos anfragen</div>
            <p className="mt-1 text-sm text-slate-600">
              Pflicht: Privat/Gewerbe, Vorname, Nachname, Telefonnummer, DSGVO. E-Mail ist optional.
            </p>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-slate-900"
            style={{ backgroundColor: ACCENT }}
          >
            kostenlos
          </span>
        </div>

        {ok && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <div className="font-semibold">✅ Anfrage erfolgreich gesendet.</div>
            <div className="mt-1 text-emerald-900/80">
              {ok.sentCustomer
                ? 'Wir haben Ihnen eine Bestätigung per E-Mail geschickt.'
                : 'Sie haben keine E-Mail angegeben – wir melden uns telefonisch.'}
            </div>
          </div>
        )}

        {err && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
            <div className="font-semibold">⚠️ Konnte nicht gesendet werden.</div>
            <div className="mt-1 text-rose-900/80">
              {err.error || 'Bitte prüfen Sie die Eingaben.'}
              {err.details ? <span className="block mt-1 opacity-80">{err.details}</span> : null}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          {/* Honeypot */}
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          {/* Kunde */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-900">
                Kunde <span className="text-rose-600">*</span>
              </div>

              {customerType ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[11px] text-slate-900"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  {customerType === 'privat' ? 'Privat' : 'Gewerbe'}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[11px] text-slate-900"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  >
                    !
                  </span>
                  Bitte auswählen
                </div>
              )}
            </div>

            <p className="mb-2 text-xs text-slate-600">
              Bitte wählen Sie aus, ob es sich um eine <span className="font-semibold">Privat</span>- oder{' '}
              <span className="font-semibold">Gewerbe</span>-Entrümpelung handelt.
            </p>

            {/* Hinweis-Rahmen nur ab sm */}
            <div
              className={[
                'transition',
                customerType
                  ? 'sm:rounded-3xl sm:border sm:border-transparent sm:p-2'
                  : 'sm:rounded-3xl sm:border sm:border-amber-300/80 sm:bg-amber-50/60 sm:p-2 sm:ring-4 sm:ring-amber-200/40',
              ].join(' ')}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Privat */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="customerType"
                    value="privat"
                    checked={customerType === 'privat'}
                    onChange={() => setCustomerType('privat')}
                    required
                    className="sr-only"
                  />
                  <div
                    className={[
                      'flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 transition',
                      'shadow-sm hover:shadow-md',
                      customerType === 'privat' ? 'border-black/15 ring-4 ring-black/5' : 'border-black/10',
                    ].join(' ')}
                    style={
                      customerType === 'privat'
                        ? { borderColor: `${ACCENT}66`, boxShadow: `0 0 0 6px ${ACCENT}14` }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white">
                        🏠
                      </span>
                      <div className="leading-tight">
                        <div className="font-semibold">Privat</div>
                        <div className="text-[12px] text-slate-600">Wohnung / Haus / Keller</div>
                      </div>
                    </div>

                    {customerType === 'privat' ? (
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-900"
                        style={{ backgroundColor: ACCENT }}
                      >
                        ✓ gewählt
                      </span>
                    ) : (
                      <span className="rounded-full border border-black/10 bg-black/[0.02] px-2 py-0.5 text-xs text-slate-600">
                        auswählen
                      </span>
                    )}
                  </div>
                </label>

                {/* Gewerbe */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="customerType"
                    value="gewerbe"
                    checked={customerType === 'gewerbe'}
                    onChange={() => setCustomerType('gewerbe')}
                    required
                    className="sr-only"
                  />
                  <div
                    className={[
                      'flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 transition',
                      'shadow-sm hover:shadow-md',
                      customerType === 'gewerbe' ? 'border-black/15 ring-4 ring-black/5' : 'border-black/10',
                    ].join(' ')}
                    style={
                      customerType === 'gewerbe'
                        ? { borderColor: `${ACCENT}66`, boxShadow: `0 0 0 6px ${ACCENT}14` }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white">
                        🏢
                      </span>
                      <div className="leading-tight">
                        <div className="font-semibold">Gewerbe</div>
                        <div className="text-[12px] text-slate-600">Büro / Lager / Handel</div>
                      </div>
                    </div>

                    {customerType === 'gewerbe' ? (
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-900"
                        style={{ backgroundColor: ACCENT }}
                      >
                        ✓ gewählt
                      </span>
                    ) : (
                      <span className="rounded-full border border-black/10 bg-black/[0.02] px-2 py-0.5 text-xs text-slate-600">
                        auswählen
                      </span>
                    )}
                  </div>
                </label>
              </div>

              {fieldError('customerType') && (
                <div className="mt-2 text-xs font-medium text-rose-700">{fieldError('customerType')}</div>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Vorname*</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Max"
                autoComplete="given-name"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-4 ${
                  fieldError('firstName')
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                    : 'border-black/10 focus:border-black/20 focus:ring-black/5'
                }`}
              />
              {fieldError('firstName') && (
                <div className="mt-1 text-xs text-rose-700">{fieldError('firstName')}</div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Nachname*</label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Mustermann"
                autoComplete="family-name"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-4 ${
                  fieldError('lastName')
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                    : 'border-black/10 focus:border-black/20 focus:ring-black/5'
                }`}
              />
              {fieldError('lastName') && (
                <div className="mt-1 text-xs text-rose-700">{fieldError('lastName')}</div>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Telefonnummer*</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+49 170 1234567"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-4 ${
                  fieldError('phone')
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                    : 'border-black/10 focus:border-black/20 focus:ring-black/5'
                }`}
              />
              {fieldError('phone') && <div className="mt-1 text-xs text-rose-700">{fieldError('phone')}</div>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">E-Mail (optional)</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="max@mail.de"
                type="email"
                autoComplete="email"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-4 ${
                  fieldError('email')
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                    : 'border-black/10 focus:border-black/20 focus:ring-black/5'
                }`}
              />
              {fieldError('email') && <div className="mt-1 text-xs text-rose-700">{fieldError('email')}</div>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Ort / PLZ & Objekt (für schnellen Fixpreis)
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="z. B. 30159 Hannover • 2-Zimmer Wohnung"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Kurzbeschreibung (Menge, Etage, Besonderheiten)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="z. B. Keller ca. 12 m², viele Kartons, Etage EG, guter Zugang, Termin gerne diese Woche…"
              className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm text-slate-700 transition hover:bg-black/[0.02]">
            <input
              required
              checked={dsgvo}
              onChange={(e) => setDsgvo(e.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-black/20 accent-[#f9a727]"
            />
            <span>
              Ich habe die{' '}
              <a href="/datenschutz" className="font-semibold text-slate-900 underline underline-offset-4">
                Datenschutzhinweise
              </a>{' '}
              gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.* (DSGVO)
            </span>
          </label>
          {fieldError('dsgvo') && <div className="text-xs text-rose-700">{fieldError('dsgvo')}</div>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="group relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold text-slate-900 transition disabled:opacity-60"
            style={{ backgroundColor: ACCENT }}
            aria-disabled={!canSubmit}
            title={!customerType ? 'Bitte zuerst Privat oder Gewerbe auswählen' : !dsgvo ? 'Bitte DSGVO bestätigen' : ''}
          >
            <span className="relative z-10">{loading ? 'Sende…' : 'Jetzt Anfrage senden'}</span>
            <span
              className="pointer-events-none absolute -left-16 top-0 h-full w-40 rotate-12 opacity-30 blur-xl transition group-hover:translate-x-[420px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)' }}
            />
          </button>

          {!customerType && (
            <div className="text-xs font-medium text-amber-700">
              Bitte wählen Sie zuerst <span className="font-semibold">Privat</span> oder{' '}
              <span className="font-semibold">Gewerbe</span>.
            </div>
          )}

          {/* ✅ Hint-Boxen: auf Handy weg, ab sm sichtbar */}
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-2 text-xs text-slate-500">
            <div className="rounded-2xl border border-black/10 bg-white p-3">✅ Fixpreis möglich (nach Fotos/Begehung)</div>
            <div className="rounded-2xl border border-black/10 bg-white p-3">
              ✅ {hasEmail ? 'Bestätigung per E-Mail' : 'Rückmeldung per Telefon'}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
