// src/app/danke/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import ConversionFire from './ConversionFire'

export const metadata: Metadata = {
  title: 'Anfrage eingegangen – RümpelTurbo',
  description:
    'Vielen Dank! Ihre Anfrage bei RümpelTurbo ist eingegangen. Wir melden uns schnellstmöglich mit einer Rückmeldung.',
  robots: { index: false, follow: false }, // Danke-Seiten besser nicht indexieren
  alternates: { canonical: '/danke' },
}

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

function pickParam(v: string | string[] | undefined) {
  if (!v) return ''
  return Array.isArray(v) ? String(v[0] ?? '') : String(v)
}

export default function DankePage({ searchParams }: PageProps) {
  const typRaw = pickParam(searchParams?.typ).toLowerCase()
  const mailRaw = pickParam(searchParams?.mail)

  const customerTypeLabel =
    typRaw === 'privat' ? 'Privat' : typRaw === 'gewerbe' ? 'Gewerbe' : ''

  const mailSent = mailRaw === '1' ? true : mailRaw === '0' ? false : null

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* ✅ Google Ads Conversion (nur wenn Marketing-Consent) */}
      <ConversionFire />

      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-140px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl">
              <span className="text-2xl">✅</span>
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Vielen Dank! Ihre Anfrage ist eingegangen.
              </h1>

              <p className="mt-3 text-slate-700">
                Wir haben Ihre Nachricht erhalten und melden uns{' '}
                <span className="font-medium text-slate-900">schnellstmöglich</span> bei Ihnen zurück.
              </p>

              {/* ✅ Kleine Summary aus Query-Params (optional) */}
              {(customerTypeLabel || mailSent !== null) && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  {customerTypeLabel && (
                    <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 font-medium text-slate-900 backdrop-blur-xl">
                      Typ: {customerTypeLabel}
                    </span>
                  )}
                  {mailSent !== null && (
                    <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 font-medium text-slate-900 backdrop-blur-xl">
                      {mailSent ? 'Bestätigung per E-Mail angestoßen' : 'Keine E-Mail angegeben – Rückmeldung per Telefon'}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4 text-sm text-slate-700 backdrop-blur-xl">
                <div className="font-medium text-slate-900">Wie geht’s weiter?</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Wir prüfen Ihre Angaben.</li>
                  <li>Sie erhalten eine Rückmeldung per E-Mail oder Telefon.</li>
                  <li>Falls nötig, klären wir Details (Zugang, Volumen, Etage, Termine).</li>
                </ul>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/60 bg-white/80 px-5 py-3 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-xl transition hover:bg-slate-900 hover:text-white"
                >
                  Zur Startseite
                </Link>

                <Link
                  href="/#anfrage"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/60 bg-white/60 px-5 py-3 text-sm font-medium text-slate-900 backdrop-blur-xl transition hover:bg-white/80"
                >
                  Weitere Anfrage senden
                </Link>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Hinweis: Bitte prüfen Sie ggf. auch Ihren Spam-Ordner, falls Sie keine Rückmeldung sehen.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/60">© {new Date().getFullYear()} RümpelTurbo</div>
      </div>
    </main>
  )
}
