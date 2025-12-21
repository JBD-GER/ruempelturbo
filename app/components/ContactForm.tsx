'use client'

import { useMemo } from 'react'

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

export default function ContactForm({
  action = '/api/kontakt',
  source = 'kontakt',
  className,
  title = 'Kostenlos anfragen',
  subtitle = 'Pflicht: Vorname, Nachname, Telefonnummer, DSGVO. E-Mail ist optional.',
}: Props) {
  const hintBadges = useMemo(
    () => [
      '✅ Rückmeldung i. d. R. schnell',
      '✅ Fixpreis möglich (nach Fotos/Begehung)',
      '✅ Besenrein optional',
    ],
    []
  )

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
        style={{
          background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 65%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle at 50% 50%, #000000, transparent 70%)`,
        }}
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

        <form className="mt-5 grid gap-3" method="post" action={action}>
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
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Nachname*</label>
              <input
                required
                name="lastName"
                autoComplete="family-name"
                placeholder="Mustermann"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
              />
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
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">E-Mail (optional)</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="max@mail.de"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">
              Ort / PLZ & Objekt (für schnellen Fixpreis)
            </label>
            <input
              name="location"
              placeholder="z. B. 30159 Hannover • 2-Zimmer Wohnung"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">
              Kurzbeschreibung (Menge, Etage, Besonderheiten)
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="z. B. Keller ca. 12 m², viele Kartons, Etage EG, guter Zugang, Termin gerne diese Woche…"
              className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm text-zinc-700 shadow-sm transition hover:bg-zinc-50">
            <input
              required
              name="dsgvo"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-black/20 accent-[#f9a727]"
            />
            <span>
              Ich habe die{' '}
              <a href="/datenschutz" className="font-semibold text-zinc-900 underline underline-offset-4">
                Datenschutzhinweise
              </a>{' '}
              gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.* (DSGVO)
            </span>
          </label>

          {/* ✅ Button: ohne Hover/Glanz */}
          <button
            type="submit"
            className="rounded-2xl px-5 py-3 text-sm font-semibold text-black shadow-sm"
            style={{ backgroundColor: BRAND.accent }}
          >
            Jetzt Anfrage senden
          </button>

          {/* ✅ Hint-Boxen: auf Handy weg, ab sm sichtbar */}
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
