'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const BRAND = {
  name: 'RümpelTurbo',
  accent: '#f9a727',
}

type Props = {
  action?: string
  source?: string
  className?: string
  title?: string
  subtitle?: string
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type ApiOk = { ok: true; sentCustomer?: boolean }
type ApiErr = { ok: false; error?: string; details?: string; errors?: Record<string, string> }

export default function ContactForm({
  action = '/api/kontakt',
  source = 'kontakt',
  className,
  title = 'Kostenlos anfragen',
  subtitle = 'Pflicht: Vorname, Nachname, Telefonnummer, DSGVO. E-Mail ist optional.',
}: Props) {
  const router = useRouter()

  const hintBadges = useMemo(
    () => ['✅ Rückmeldung i. d. R. schnell', '✅ Fixpreis möglich (nach Fotos/Begehung)', '✅ Besenrein optional'],
    []
  )

  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<ApiOk | null>(null)
  const [err, setErr] = useState<ApiErr | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOk(null)
    setErr(null)
    setLoading(true)

    try {
      const form = e.currentTarget
      const fd = new FormData(form)

      // source erzwingen (falls jemand das hidden Feld entfernt)
      fd.set('source', source)

      const res = await fetch(action, {
        method: 'POST',
        body: fd,
      })

      let data: any = null
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) data = await res.json()
      else data = { ok: res.ok }

      if (!res.ok || data?.ok === false) {
        setErr((data || { ok: false, error: 'Konnte nicht gesendet werden.' }) as ApiErr)
      } else {
        const okData = (data || { ok: true }) as ApiOk
        setOk(okData)
        form.reset()

        // ✅ Weiterleitung auf Danke (mit optionalen Infos)
        const mail = okData.sentCustomer ? '1' : '0'
        const src = encodeURIComponent(source || 'kontakt')
        router.replace(`/danke?src=${src}&mail=${mail}`)
      }
    } catch (e: any) {
      setErr({ ok: false, error: 'Netzwerkfehler', details: String(e?.message || e) })
    } finally {
      setLoading(false)
    }
  }

  const fieldError = (k: string) => err?.errors?.[k]

  return (
    <section
      id="anfrage"
      className={cx(
        'relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur md:p-6',
        className
      )}
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 65%)` }}
      />
      <div
        className="pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full blur-3xl opacity-15"
        style={{ background: `radial-gradient(circle at 50% 50%, #000000, transparent 70%)` }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900">{title}</div>
            <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
          </div>

          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-black"
            style={{ backgroundColor: BRAND.accent }}
          >
            kostenlos
          </span>
        </div>

        {ok && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <div className="font-semibold">✅ Anfrage erfolgreich gesendet.</div>
            <div className="mt-1 text-emerald-900/80">Wir melden uns schnell bei Ihnen.</div>
          </div>
        )}

        {err && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
            <div className="font-semibold">⚠️ Konnte nicht gesendet werden.</div>
            <div className="mt-1 text-rose-900/80">
              {err.error || 'Bitte prüfen Sie die Eingaben.'}
              {err.details ? <span className="block mt-1 opacity-80">{err.details}</span> : null}
            </div>

            {/* Optional: Feldfehler gesammelt anzeigen */}
            {err.errors && Object.keys(err.errors).length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-xs text-rose-900/90">
                {Object.entries(err.errors).map(([k, v]) => (
                  <li key={k}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
          {/* Hidden source */}
          <input type="hidden" name="source" value={source} />

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Vorname*</label>
              <input
                required
                name="firstName"
                autoComplete="given-name"
                placeholder="Max"
                className={cx(
                  'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5',
                  fieldError('firstName') ? 'border-rose-300' : 'border-black/10'
                )}
              />
              {fieldError('firstName') && <div className="mt-1 text-xs text-rose-700">{fieldError('firstName')}</div>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Nachname*</label>
              <input
                required
                name="lastName"
                autoComplete="family-name"
                placeholder="Mustermann"
                className={cx(
                  'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5',
                  fieldError('lastName') ? 'border-rose-300' : 'border-black/10'
                )}
              />
              {fieldError('lastName') && <div className="mt-1 text-xs text-rose-700">{fieldError('lastName')}</div>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Telefonnummer*</label>
              <input
                required
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+49 170 1234567"
                className={cx(
                  'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5',
                  fieldError('phone') ? 'border-rose-300' : 'border-black/10'
                )}
              />
              {fieldError('phone') && <div className="mt-1 text-xs text-rose-700">{fieldError('phone')}</div>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">E-Mail (optional)</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="max@mail.de"
                className={cx(
                  'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5',
                  fieldError('email') ? 'border-rose-300' : 'border-black/10'
                )}
              />
              {fieldError('email') && <div className="mt-1 text-xs text-rose-700">{fieldError('email')}</div>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">Ort / PLZ & Objekt (für schnellen Fixpreis)</label>
            <input
              name="location"
              placeholder="z. B. 30159 Hannover • 2-Zimmer Wohnung"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">Kurzbeschreibung (Menge, Etage, Besonderheiten)</label>
            <textarea
              name="message"
              rows={4}
              placeholder="z. B. Keller ca. 12 m², viele Kartons, Etage EG, guter Zugang, Termin gerne diese Woche…"
              className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm text-zinc-700 shadow-sm transition hover:bg-zinc-50">
            <input required name="dsgvo" type="checkbox" className="mt-1 h-4 w-4 rounded border-black/20 accent-[#f9a727]" />
            <span>
              Ich habe die{' '}
              <a href="/datenschutz" className="font-semibold text-zinc-900 underline underline-offset-4">
                Datenschutzhinweise
              </a>{' '}
              gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.* (DSGVO)
            </span>
          </label>
          {fieldError('dsgvo') && <div className="text-xs text-rose-700">{fieldError('dsgvo')}</div>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl px-5 py-3 text-sm font-semibold text-black shadow-sm disabled:opacity-60"
            style={{ backgroundColor: BRAND.accent }}
          >
            {loading ? 'Sende…' : 'Jetzt Anfrage senden'}
          </button>

          {/* Hint-Boxen: auf Handy weg, ab sm sichtbar */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-2 text-xs text-zinc-600">
            {hintBadges.map((t) => (
              <div key={t} className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
                {t}
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  )
}
