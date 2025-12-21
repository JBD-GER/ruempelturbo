// src/app/impressum/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const COMPANY = {
  brand: 'RÜMPELTURBO',
  legal: 'Flaaq Holding GmbH',
  managingDirector: 'Christoph Pfad',
  street: 'Dammstr. 6G',
  zipCity: '30890 Barsinghausen',
  phone: '+4950353169998',
  email: 'info@ruempelturbo.de',
  registerCourt: 'Amtsgericht Hannover',
  hbr: 'HRB 223594',
  vatId: 'DE352217621',
} as const

const ADDRESS_ONE_LINE = `${COMPANY.legal}, ${COMPANY.street}, ${COMPANY.zipCity}`

export const metadata: Metadata = {
  title: `Impressum – ${COMPANY.brand}`,
  description: `Impressum der ${COMPANY.legal} (${COMPANY.brand}) – Anbieterkennzeichnung, Register, Kontakt, Haftung, Urheberrecht.`,
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">{title}</h2>
      <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">{children}</div>
    </section>
  )
}

function InfoRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="text-[11px] font-medium text-slate-600">{k}</div>
      <div className="text-[12px] font-semibold text-slate-900 sm:text-right">{v}</div>
    </div>
  )
}

const TOC = [
  { id: 'headnote', t: 'Pflichtangaben' },
  { id: 'anbieter', t: '1. Anbieter & Kontakt' },
  { id: 'vertretung', t: '2. Vertretungsberechtigt' },
  { id: 'register', t: '3. Register & Umsatzsteuer' },
  { id: 'verantwortlich', t: '4. Verantwortlich i.S.d. MStV' },
  { id: 'streit', t: '5. Streitbeilegung' },
  { id: 'haftung-inhalte', t: '6. Haftung für Inhalte' },
  { id: 'haftung-links', t: '7. Haftung für Links' },
  { id: 'urheber', t: '8. Urheberrecht' },
  { id: 'marken', t: '9. Marken & Hinweise' },
] as const

export default function ImpressumPage() {
  const telHref = `tel:${COMPANY.phone.replace(/\s/g, '')}`
  const mailHref = `mailto:${COMPANY.email}`

  return (
    <main className="bg-white">
      <header className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f9a727]" />
          Rechtliches · Impressum
        </div>

        <h1 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          Impressum
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
          Angaben gemäß <span className="font-semibold text-slate-900">§ 5 TMG</span> und{' '}
          <span className="font-semibold text-slate-900">§ 18 Abs. 2 MStV</span> für{' '}
          <span className="font-semibold text-slate-900">{COMPANY.brand}</span> ({COMPANY.legal}).
        </p>
      </header>

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* TOC */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="rounded-[1.6rem] border border-slate-900/10 bg-white p-5 shadow-sm">
                <div className="text-[12px] font-semibold text-slate-900">Inhalt</div>

                <nav className="mt-3 space-y-1.5">
                  {TOC.map((x) => (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      className="block rounded-xl border border-transparent px-3 py-2 text-[12px] text-slate-700 transition hover:border-slate-900/10 hover:bg-slate-50"
                    >
                      {x.t}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 rounded-2xl border border-slate-900/10 bg-white p-4 text-[11px] leading-relaxed text-slate-700 shadow-sm">
                  <div className="font-semibold text-slate-900">Kontakt</div>
                  <div className="mt-2 space-y-1.5">
                    <div>
                      E-Mail:{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                        {COMPANY.email}
                      </a>
                    </div>
                    <div>
                      Telefon:{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={telHref}>
                        {COMPANY.phone}
                      </a>
                    </div>
                    <div className="pt-1">
                      <Link className="font-medium text-slate-900 underline underline-offset-2" href="/kontakt">
                        /kontakt
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-slate-600">
                  Zurück zur{' '}
                  <Link href="/" className="font-medium text-slate-900 underline underline-offset-2">
                    Startseite
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <div className="rounded-[1.8rem] border border-slate-900/10 bg-white p-6 shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:p-8">
                <div className="space-y-10">
                  <Section id="headnote" title="Pflichtangaben">
                    <div className="rounded-2xl border border-slate-900/10 bg-white p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                      <div className="font-semibold text-slate-900">Kurz & klar</div>
                      <ul className="mt-2 space-y-1.5">
                        <li>
                          • Anbieter: <span className="font-medium text-slate-900">{COMPANY.legal}</span>
                        </li>
                        <li>
                          • Marke: <span className="font-medium text-slate-900">{COMPANY.brand}</span>
                        </li>
                        <li>
                          • Anschrift:{' '}
                          <span className="font-medium text-slate-900">
                            {COMPANY.street}, {COMPANY.zipCity}
                          </span>
                        </li>
                        <li>
                          • Kontakt:{' '}
                          <span className="font-medium text-slate-900">
                            {COMPANY.email} · {COMPANY.phone}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </Section>

                  <Section id="anbieter" title="1. Anbieter & Kontakt">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k="Anbieter" v={COMPANY.legal} />
                      <InfoRow k="Marke" v={COMPANY.brand} />
                      <InfoRow
                        k="Anschrift"
                        v={
                          <span className="inline-block">
                            {COMPANY.street}, {COMPANY.zipCity}
                          </span>
                        }
                      />
                      <InfoRow
                        k="E-Mail"
                        v={
                          <a className="underline underline-offset-2" href={mailHref}>
                            {COMPANY.email}
                          </a>
                        }
                      />
                      <InfoRow
                        k="Telefon"
                        v={
                          <a className="underline underline-offset-2" href={telHref}>
                            {COMPANY.phone}
                          </a>
                        }
                      />
                      <InfoRow
                        k="Kontaktformular"
                        v={
                          <Link className="underline underline-offset-2" href="/kontakt">
                            /kontakt
                          </Link>
                        }
                      />
                    </div>
                  </Section>

                  <Section id="vertretung" title="2. Vertretungsberechtigt">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k="Geschäftsführer" v={<span className="font-semibold">{COMPANY.managingDirector}</span>} />
                      <InfoRow k="Vertretung" v={<span>Vertretungsberechtigt</span>} />
                    </div>
                  </Section>

                  <Section id="register" title="3. Register & Umsatzsteuer">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k="Registergericht" v={COMPANY.registerCourt} />
                      <InfoRow k="Handelsregister" v={COMPANY.hbr} />
                      <InfoRow k="USt-IdNr." v={<span className="font-semibold">{COMPANY.vatId}</span>} />
                      <InfoRow k="Rechtsgrundlage" v={<span>USt-IdNr. gemäß § 27 a UStG</span>} />
                    </div>
                  </Section>

                  <Section id="verantwortlich" title="4. Verantwortlich i.S.d. MStV">
                    <p>
                      Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:{' '}
                      <span className="font-semibold text-slate-900">{ADDRESS_ONE_LINE}</span>.
                    </p>
                  </Section>

                  <Section id="streit" title="5. Streitbeilegung">
                    <p>
                      Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an Streitbeilegungsverfahren vor einer
                      Verbraucherschlichtungsstelle teilzunehmen, sofern nicht gesetzlich zwingend.
                    </p>
                    <p>
                      Hinweis: Die EU-Online-Streitbeilegungsplattform (OS) wurde zum 20.07.2025 eingestellt. Neue Beschwerden
                      können dort nicht mehr eingereicht werden.
                    </p>
                  </Section>

                  <Section id="haftung-inhalte" title="6. Haftung für Inhalte">
                    <p>
                      Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                      verantwortlich. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität
                      der Inhalte, soweit gesetzlich zulässig.
                    </p>
                    <p>
                      Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                      Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                  </Section>

                  <Section id="haftung-links" title="7. Haftung für Links">
                    <p>
                      Diese Website enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                      haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                    </p>
                    <p>
                      Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                      verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.
                    </p>
                  </Section>

                  <Section id="urheber" title="8. Urheberrecht">
                    <p>
                      Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                      Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                      Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                    <p>
                      Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet,
                      soweit gesetzlich zulässig.
                    </p>
                  </Section>

                  <Section id="marken" title="9. Marken & Hinweise">
                    <div className="rounded-2xl border border-slate-900/10 bg-white p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                      <div className="font-semibold text-slate-900">Marken / Logos</div>
                      <ul className="mt-2 space-y-1.5">
                        <li>• Genannte Marken/Logos können Eigentum der jeweiligen Rechteinhaber sein.</li>
                        <li>
                          • Produktnamen dienen der Beschreibung von Technologien/Leistungen und begründen keine Partnerschaft.
                        </li>
                      </ul>
                    </div>
                  </Section>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href="/kontakt"
                      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#f9a727] px-6 text-sm font-semibold text-white"
                    >
                      Kontakt aufnehmen →
                    </Link>

                    <div className="text-center text-[11px] text-slate-600 sm:text-right">
                      {COMPANY.legal} · {COMPANY.zipCity}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-500">
                <Link className="underline underline-offset-2" href="/datenschutz">
                  Datenschutz
                </Link>
                <span className="px-2">·</span>
                <Link className="underline underline-offset-2" href="/kontakt">
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
