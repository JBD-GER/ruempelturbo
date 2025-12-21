import Link from 'next/link'
import Image from 'next/image'

const BRAND = {
  name: 'RÜMPELTURBO',
  accent: '#f9a727',
  phone: '+4950353169998',
  email: 'info@ruempelturbo.de',
}

export default function Footer() {
  const phoneHref = `tel:${BRAND.phone.replace(/\s+/g, '')}`

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        {/* CTA strip (kompakter) */}
        <div className="py-8 sm:py-10">
          <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur sm:p-7">
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 62%)`,
              }}
            />

            <div className="relative grid gap-4 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Schnell anfragen
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  Entrümpelung ohne Stress – wir melden uns schnell zurück.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">
                  PLZ/Ort + Objekt + grobe Menge reichen oft für einen schnellen Fixpreis.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {/* ✅ immer zurück zur Startseite + zur Section */}
                <Link
                  href="/#anfrage"
                  className="rounded-2xl px-4 py-3 text-center text-sm font-semibold text-black shadow-sm"
                  style={{ backgroundColor: BRAND.accent }}
                >
                  Zum Formular
                </Link>

                <a
                  href={phoneHref}
                  className="rounded-2xl border border-black/12 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm"
                >
                  📞 {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-8 pb-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${BRAND.name} Logo`}
                width={64}
                height={64}
                quality={100}
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <div className="leading-tight">
                <div className="text-base font-semibold text-zinc-900">{BRAND.name}</div>
                <div className="text-[12px] text-zinc-600">TURBOSCHNELL ENTRÜMPELT</div>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-700">
              Wohnung, Haus, Keller, Dachboden oder Gewerbe: zügig, sauber und planbar – inkl.
              Abtransport &amp; Entsorgung. Auf Wunsch besenrein und optional mit End-/Übergabereinigung.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
                ⚡ Express möglich
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
                ♻️ Entsorgung inkl.
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
                🧹 Besenrein optional
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="text-sm font-semibold text-zinc-900">Schnellzugriff</div>
            <div className="mt-3 grid gap-2 text-sm">
              {/* ✅ immer /#... */}
              <Link href="/#leistungen" className="text-zinc-700 hover:text-zinc-950">
                Leistungen
              </Link>
              <Link href="/#ablauf" className="text-zinc-700 hover:text-zinc-950">
                Ablauf
              </Link>
              <Link href="/#kosten" className="text-zinc-700 hover:text-zinc-950">
                Kosten
              </Link>
              <Link href="/#faq" className="text-zinc-700 hover:text-zinc-950">
                FAQ
              </Link>
                <Link href="/impressum" className="text-zinc-700 hover:text-zinc-950">
                  Impressum
                </Link>
              <Link href="/datenschutz" className="text-zinc-700 hover:text-zinc-950">
                Datenschutz
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="text-sm font-semibold text-zinc-900">Kontakt</div>

<div className="mt-3 grid gap-2 text-sm">
  <a
    href={phoneHref}
    className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-950"
  >
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm"
      aria-hidden
    >
      📞
    </span>
    {BRAND.phone}
  </a>

  <a
    href={`mailto:${BRAND.email}`}
    className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-950"
  >
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm"
      aria-hidden
    >
      ✉️
    </span>
    {BRAND.email}
  </a>

  <Link
    href="/kontakt"
    className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-950"
  >
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm"
      aria-hidden
    >
      💬
    </span>
    Kontakt
  </Link>
</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 py-6">
          <div className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {BRAND.name}. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  )
}
