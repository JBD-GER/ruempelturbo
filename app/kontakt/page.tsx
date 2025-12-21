// src/app/kontakt/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '../components/ContactForm'

const BRAND = {
  name: 'RümpelTurbo',
  accent: '#f9a727',
  phone: '+4950353169998',
  email: 'info@ruempelturbo.de',
}

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie RümpelTurbo für schnelle Entrümpelung (Wohnung, Haus, Keller, Dachboden, Gewerbe). Kostenlos anfragen oder direkt anrufen.',
  alternates: { canonical: '/kontakt' },
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-zinc-700 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
              Kontakt
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Schreiben Sie uns – oder{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BRAND.accent}, #111827)`,
                }}
              >
                rufen Sie direkt an
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-700 md:text-lg">
              Für einen schnellen Fixpreis helfen uns <b>PLZ/Ort</b>, das <b>Objekt</b> (z. B. Wohnung/Keller)
              und eine grobe Einschätzung der Menge. Fotos sind optional – wir klären Details auch kurz am Telefon.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={phoneHref(BRAND.phone)}
                className="flex items-center justify-between rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:bg-zinc-50"
              >
                <div>
                  <div className="text-sm font-semibold">Telefon</div>
                  <div className="mt-1 text-sm text-zinc-700">{BRAND.phone}</div>
                </div>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white"
                  aria-hidden
                >
                  📞
                </span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center justify-between rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:bg-zinc-50"
              >
                <div>
                  <div className="text-sm font-semibold">E-Mail</div>
                  <div className="mt-1 text-sm text-zinc-700">{BRAND.email}</div>
                </div>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white"
                  aria-hidden
                >
                  ✉️
                </span>
              </a>

              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold">Fixpreis</div>
                <div className="mt-1 text-sm text-zinc-700">Meist nach Fotos/kurzer Begehung.</div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold">Termine</div>
                <div className="mt-1 text-sm text-zinc-700">Kurzfristig möglich (je nach Auslastung).</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#anfrage"
                className="rounded-2xl px-5 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
                style={{ backgroundColor: BRAND.accent }}
              >
                Zum Formular
              </a>
              <a
                href={phoneHref(BRAND.phone)}
                className="rounded-2xl border border-black/12 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
              >
                Direkt anrufen
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <ContactForm source="kontakt" />
          </div>
        </div>

                {/* ✅ Team section statt Standort */}
        <div className="mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm">
          {/* Bild oben */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/bilder/team.png"
              alt="Team von RümpelTurbo"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          </div>

          {/* Text darunter */}
          <div className="p-6 md:p-8">
            <div className="text-sm font-semibold text-zinc-900">Unser Team</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
              Schnell. Sauber. Planbar.
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-700">
              Wir sind ein eingespieltes Team für Entrümpelungen – von Wohnung und Haus bis Keller, Dachboden
              und Gewerbe. Unser Fokus: <b>klare Absprachen</b>, <b>zügige Durchführung</b> und auf Wunsch eine
              <b>besenreine Übergabe</b>.
            </p>

            <div className="mt-4 grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                Fixpreis nach Fotos/Begehung möglich
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                Kurzfristige Termine (je nach Auslastung)
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                Entsorgung inkl. – optional Endreinigung
              </div>
            </div>

            {/* Nur Telefon-CTA */}
            <div className="mt-6">
              <a
                href={phoneHref(BRAND.phone)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-black/12 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 sm:w-auto"
              >
                📞 {BRAND.phone}
              </a>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}
