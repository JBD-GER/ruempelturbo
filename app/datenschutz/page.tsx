// src/app/datenschutz/page.tsx
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
} as const

const telHref = `tel:${COMPANY.phone.replace(/\s/g, '')}`
const mailHref = `mailto:${COMPANY.email}`

export const metadata: Metadata = {
  title: `Datenschutz – ${COMPANY.brand}`,
  description: `Datenschutzerklärung der ${COMPANY.legal} (${COMPANY.brand}) – Hosting (Vercel), Datenverarbeitung (Supabase), Google Tag Manager & Google Analytics (Conversion Tracking).`,
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
}

const TOC = [
  { id: 'ueberblick', t: 'Überblick' },
  { id: 'verantwortlicher', t: '1. Verantwortlicher' },
  { id: 'datenarten', t: '2. Datenarten & Zwecke' },
  { id: 'rechtsgrundlagen', t: '3. Rechtsgrundlagen' },
  { id: 'hosting', t: '4. Hosting (Vercel) & Server-Logs' },
  { id: 'supabase', t: '5. Supabase (Auth/DB/Storage)' },
  { id: 'kontakt', t: '6. Kontaktaufnahme' },
  { id: 'cookies', t: '7. Cookies & Einwilligung' },
  { id: 'gtm', t: '8. Google Tag Manager' },
  { id: 'ga', t: '9. Google Analytics (GA4) & Conversion Tracking' },
  { id: 'drittland', t: '10. Drittlandübermittlung' },
  { id: 'speicher', t: '11. Speicherdauer' },
  { id: 'rechte', t: '12. Ihre Rechte' },
  { id: 'widerspruch', t: '13. Widerspruch & Widerruf' },
  { id: 'updates', t: '14. Änderungen dieser Erklärung' },
] as const

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

export default function DatenschutzPage() {
  return (
    <main className="bg-white">
      <header className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f9a727]" />
          Datenschutz · Stand: 15.12.2025
        </div>

        <h1 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          Datenschutzerklärung
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
          Diese Datenschutzerklärung informiert Sie darüber, wie{' '}
          <span className="font-semibold text-slate-900">{COMPANY.brand}</span> ({COMPANY.legal}) personenbezogene Daten
          verarbeitet — inkl. Hosting über <span className="font-semibold text-slate-900">Vercel</span>,
          Datenverarbeitung über <span className="font-semibold text-slate-900">Supabase</span> sowie Tracking über{' '}
          <span className="font-semibold text-slate-900">Google Tag Manager</span> &amp;{' '}
          <span className="font-semibold text-slate-900">Google Analytics (GA4)</span>.
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
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-slate-600">
                  Rechtliches:{' '}
                  <Link className="font-medium text-slate-900 underline underline-offset-2" href="/impressum">
                    Impressum
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
                  <Section id="ueberblick" title="Überblick">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k="Verantwortlicher" v={<span>{COMPANY.legal}</span>} />
                      <InfoRow
                        k="Kontakt"
                        v={
                          <span>
                            <a className="underline underline-offset-2" href={mailHref}>
                              {COMPANY.email}
                            </a>{' '}
                            ·{' '}
                            <a className="underline underline-offset-2" href={telHref}>
                              {COMPANY.phone}
                            </a>
                          </span>
                        }
                      />
                      <InfoRow k="Hosting" v={<span>Vercel (Webhosting/Edge/Logs)</span>} />
                      <InfoRow k="App/DB/Auth" v={<span>Supabase (DB, Auth, Storage)</span>} />
                      <InfoRow k="Tracking" v={<span>Google Tag Manager & Google Analytics (GA4)</span>} />
                      <InfoRow k="Einwilligung" v={<span>Tracking i.d.R. nur nach Consent (Cookie/Consent-Banner)</span>} />
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-900/10 bg-white p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                      <div className="font-semibold text-slate-900">Wichtig</div>
                      Wir nutzen Tracking/Conversion-Tracking grundsätzlich so, dass es erst nach Ihrer Einwilligung
                      aktiviert wird (sofern technisch eingerichtet). Ohne Einwilligung erfolgt nur technisch notwendige
                      Verarbeitung (z. B. Server-Logs).
                    </div>
                  </Section>

                  <Section id="verantwortlicher" title="1. Verantwortlicher">
                    <div className="rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm">
                      <div className="text-[12px] font-semibold text-slate-900">{COMPANY.legal}</div>
                      <div className="mt-1 text-[12px] text-slate-700">
                        {COMPANY.street}, {COMPANY.zipCity}
                      </div>
                      <div className="mt-2 grid gap-2 text-[12px] text-slate-700 sm:grid-cols-2">
                        <div>
                          Geschäftsführer:{' '}
                          <span className="font-medium text-slate-900">{COMPANY.managingDirector}</span>
                        </div>
                        <div>
                          E-Mail:{' '}
                          <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                            {COMPANY.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <p>Ein Datenschutzbeauftragter ist nicht bestellt, sofern dies nicht gesetzlich erforderlich ist.</p>
                  </Section>

                  <Section id="datenarten" title="2. Datenarten & Zwecke">
                    <ul className="space-y-2">
                      <li>
                        • <span className="font-semibold text-slate-900">Nutzungs-/Logdaten</span> (z. B. IP-Adresse,
                        Zeitstempel, aufgerufene Seite) zur technischen Bereitstellung &amp; Sicherheit.
                      </li>
                      <li>
                        • <span className="font-semibold text-slate-900">Kontakt-/Kommunikationsdaten</span> (z. B. Name,
                        E-Mail, Nachricht) zur Bearbeitung von Anfragen.
                      </li>
                      <li>
                        • <span className="font-semibold text-slate-900">Analyse-/Marketingdaten</span> (z. B.
                        Ereignisse/Conversions) zur Reichweitenmessung und Optimierung – i. d. R. nur nach Einwilligung.
                      </li>
                      <li>
                        • <span className="font-semibold text-slate-900">App-Daten</span> (bei Nutzung einer Demo/App) in
                        Supabase (Auth/DB/Storage) je nach Funktionsumfang.
                      </li>
                    </ul>
                  </Section>

                  <Section id="rechtsgrundlagen" title="3. Rechtsgrundlagen">
                    <ul className="space-y-2">
                      <li>
                        • <span className="font-semibold text-slate-900">Art. 6 Abs. 1 lit. b DSGVO</span> –
                        Vertragsdurchführung/Anbahnung (z. B. Projektanfrage).
                      </li>
                      <li>
                        • <span className="font-semibold text-slate-900">Art. 6 Abs. 1 lit. f DSGVO</span> – berechtigtes
                        Interesse (Sicherheit, Stabilität, Missbrauchsprävention).
                      </li>
                      <li>
                        • <span className="font-semibold text-slate-900">Art. 6 Abs. 1 lit. a DSGVO</span> – Einwilligung
                        (z. B. Analytics/Marketing/Conversion Tracking).
                      </li>
                    </ul>
                  </Section>

                  <Section id="hosting" title="4. Hosting (Vercel) & Server-Logs">
                    <p>
                      Diese Website wird über Vercel bereitgestellt. Dabei werden zur Auslieferung und Absicherung der
                      Website technisch notwendige Daten verarbeitet (z. B. Server-Logs, IP-Adresse, User-Agent, Referrer,
                      Zeitstempel).
                    </p>
                    <p>
                      Zweck: Bereitstellung der Website, Fehleranalyse, Abwehr von Angriffen (z. B. DDoS), Optimierung der
                      Auslieferung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                    </p>
                  </Section>

                  <Section id="supabase" title="5. Supabase (Auth/DB/Storage)">
                    <p>
                      Für App-Funktionen (z. B. Login/Accounts, Datenbank, Dateiablage) nutzen wir Supabase. Dabei können je
                      nach Nutzung u. a. Accountdaten (E-Mail), technische Metadaten sowie Inhalte/Daten in der Datenbank
                      verarbeitet werden.
                    </p>
                    <p>
                      Zweck: Bereitstellung von Authentifizierung, Datenhaltung, Dateispeicherung und App-Logik.
                      Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vertragliche/vorvertragliche Maßnahmen) bzw. Art. 6
                      Abs. 1 lit. f DSGVO (Betrieb/Sicherheit).
                    </p>
                  </Section>

                  <Section id="kontakt" title="6. Kontaktaufnahme">
                    <p>
                      Wenn Sie uns kontaktieren (z. B. per E-Mail, Telefon oder Kontaktformular), verarbeiten wir die von
                      Ihnen übermittelten Daten zur Bearbeitung der Anfrage und für Rückfragen.
                    </p>
                    <p>
                      Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich/vertraglich) oder Art. 6 Abs. 1 lit. f
                      DSGVO (allgemeine Kommunikation/Organisation).
                    </p>
                  </Section>

                  <Section id="cookies" title="7. Cookies & Einwilligung">
                    <p>
                      Wir verwenden – abhängig von Ihrer Auswahl im Consent-/Cookie-Banner – Cookies bzw. ähnliche
                      Technologien. Technisch notwendige Cookies können ohne Einwilligung gesetzt werden. Analyse/Marketing
                      erfolgt in der Regel nur nach Einwilligung.
                    </p>
                  </Section>

                  <Section id="gtm" title="8. Google Tag Manager">
                    <p>
                      Wir nutzen den Google Tag Manager, um Website-Tags zentral zu verwalten. Der Tag Manager selbst
                      erstellt in der Regel keine Nutzerprofile, kann jedoch technisch bedingt Daten (z. B. IP-Adresse)
                      übermitteln, um Tags auszuliefern.
                    </p>
                    <p>
                      Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) – sofern der Einsatz nicht als rein
                      technisch notwendig konfiguriert ist. Wir empfehlen, den Tag Manager über ein Consent-Management zu
                      steuern.
                    </p>
                  </Section>

                  <Section id="ga" title="9. Google Analytics (GA4) & Conversion Tracking">
                    <p>
                      Wir verwenden Google Analytics (GA4), um die Nutzung unserer Website zu analysieren und Conversions zu
                      messen (z. B. „Kontakt gesendet“). Dabei werden Ereignisse (Events) erfasst und ausgewertet.
                    </p>
                    <p>
                      Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Ohne Einwilligung wird Analytics/Conversion
                      Tracking nicht oder nur in einer entsprechend eingeschränkten Form ausgeführt (je nach technischer
                      Konfiguration).
                    </p>
                    <ul className="space-y-2">
                      <li>• Zwecke: Reichweitenmessung, Funnel-Optimierung, Performance-Messung von Kampagnen.</li>
                      <li>• Umfang: Seitenaufrufe, Interaktionen, technische Parameter (Browser/Device), Events/Conversions.</li>
                    </ul>
                  </Section>

                  <Section id="drittland" title="10. Drittlandübermittlung">
                    <p>
                      Bei der Nutzung von Diensten wie Google kann eine Verarbeitung von Daten in Drittländern (z. B. USA)
                      nicht ausgeschlossen werden. Wir stützen die Übermittlung auf geeignete Garantien (z. B.
                      Standardvertragsklauseln und/oder anwendbare Zertifizierungsmechanismen), soweit erforderlich.
                    </p>
                  </Section>

                  <Section id="speicher" title="11. Speicherdauer">
                    <p>
                      Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist
                      oder gesetzliche Aufbewahrungspflichten bestehen. Kontaktanfragen werden regelmäßig gelöscht, sobald
                      sie abschließend bearbeitet sind, sofern keine gesetzlichen Pflichten entgegenstehen.
                    </p>
                  </Section>

                  <Section id="rechte" title="12. Ihre Rechte">
                    <ul className="space-y-2">
                      <li>• Auskunft (Art. 15 DSGVO)</li>
                      <li>• Berichtigung (Art. 16 DSGVO)</li>
                      <li>• Löschung (Art. 17 DSGVO)</li>
                      <li>• Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                      <li>• Datenübertragbarkeit (Art. 20 DSGVO)</li>
                      <li>• Widerspruch (Art. 21 DSGVO)</li>
                      <li>• Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                    </ul>
                  </Section>

                  <Section id="widerspruch" title="13. Widerspruch & Widerruf">
                    <p>
                      Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem
                      können Sie der Verarbeitung auf Grundlage berechtigter Interessen widersprechen, sofern Gründe aus
                      Ihrer besonderen Situation vorliegen.
                    </p>
                    <p>
                      Schreiben Sie uns dazu an{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                        {COMPANY.email}
                      </a>
                      .
                    </p>
                  </Section>

                  <Section id="updates" title="14. Änderungen dieser Erklärung">
                    <p>
                      Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich Rechtslage, Dienste oder
                      Datenverarbeitung ändern. Es gilt die jeweils aktuelle Fassung auf dieser Seite.
                    </p>
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
                <Link className="underline underline-offset-2" href="/impressum">
                  Impressum
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
