// src/app/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import InquiryForm from './components/InquiryForm'

export const metadata: Metadata = {
  title: 'RümpelTurbo – schnelle Entrümpelung mit Fixpreis | Wohnung • Haus • Gewerbe',
  description:
    'Schnelle Entrümpelung für Wohnung, Haus, Keller, Dachboden & Gewerbe – kurzfristige Termine, transparente Fixpreise, besenrein. Optional: Endreinigung. Jetzt kostenlos anfragen.',
  keywords: [
    'Entrümpelung',
    'schnelle Entrümpelung',
    'Wohnungsentrümpelung',
    'Haushaltsauflösung',
    'Keller entrümpeln',
    'Dachboden entrümpeln',
    'Gewerbe entrümpeln',
    'Sperrmüll',
    'Entsorgung',
    'Besenrein',
    'Endreinigung',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RümpelTurbo – schnelle Entrümpelung mit Fixpreis',
    description:
      'Wohnung • Haus • Keller • Dachboden • Gewerbe. Kurzfristig, sauber, besenrein. Optional: Endreinigung.',
    type: 'website',
  },
}

const BRAND = {
  name: 'RümpelTurbo',
  accent: '#f9a727',
  ink: '#0b0f19',
  phone: '+4950353169998',
}

const SERVICES = [
  {
    title: 'Express-Entrümpelung',
    text: 'Kurzfristige Termine (oft 24–72h). Schnell vor Ort, schnell fertig – ohne Chaos.',
    bullets: ['schnelle Abwicklung', 'pünktlich & planbar', 'Besenrein möglich'],
  },
  {
    title: 'Wohnung & Haus',
    text: 'Von 1 Zimmer bis Komplettobjekt – inkl. Demontage von Möbeln, Küchen & Einbauten.',
    bullets: ['Haushaltsauflösung', 'Demontage', 'Übergabe besenrein'],
  },
  {
    title: 'Keller • Dachboden • Garage',
    text: 'Volle Flächen, schwere Gegenstände, viele Kartons – wir machen Platz in einem Termin.',
    bullets: ['Tragen & Abtransport', 'Sperrmüll/Altgeräte', 'auf Wunsch sortiert'],
  },
  {
    title: 'Gewerbe & Büro',
    text: 'Räumung ohne Betriebsstörung – auch früh/spät oder am Wochenende möglich.',
    bullets: ['Büro/Archiv', 'Lager/Fläche', 'diskret & effizient'],
  },
  {
    title: 'Entsorgung & Nachweise',
    text: 'Fachgerechte Entsorgung – transparent, sauber dokumentiert.',
    bullets: ['Entsorgungsketten', 'Trennung wo sinnvoll', 'Belege auf Wunsch'],
  },
  {
    title: 'Wertanrechnung (optional)',
    text: 'Wenn verwertbar, kann eine Anrechnung möglich sein – fair & nachvollziehbar.',
    bullets: ['vorab Einschätzung', 'transparent', 'kein „Kleingedrucktes“'],
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Kurzanfrage',
    text: 'Sie senden kurz: Objekt, Ort/PLZ, grobe Menge. Optional Fotos.',
  },
  {
    step: '02',
    title: 'Rückruf & Fixpreis',
    text: 'Wir klären Details, bestätigen Termin und nennen einen transparenten Preis.',
  },
  {
    step: '03',
    title: 'Entrümpelung',
    text: 'Wir räumen zügig, sauber, strukturiert. Auf Wunsch: besenrein.',
  },
  {
    step: '04',
    title: 'Optional: Endreinigung',
    text: 'Wenn Sie direkt übergeben möchten: Reinigung als Zusatzleistung.',
  },
  {
    step: '05',
    title: 'Übergabe',
    text: 'Kurze Abnahme – fertig. Auf Wunsch Entsorgungs-/Leistungsnachweis.',
  },
]

const PRICING = [
  {
    title: 'Keller / Dachboden',
    price: 'ab 149 €',
    note: 'kleine Einheiten, überschaubare Menge',
    items: ['Abtransport', 'Entsorgung', 'Termin nach Absprache'],
  },
  {
    title: 'Wohnung (1–2 Zimmer)',
    price: 'ab 449 €',
    note: 'typische Wohnungsentrümpelung',
    items: ['Demontage möglich', 'Besenrein optional', 'Fixpreis nach Fotos/Begehung'],
  },
  {
    title: 'Haus / Komplettobjekt',
    price: 'ab 999 €',
    note: 'größere Mengen & mehrere Etagen',
    items: ['Team vor Ort', 'schnelle Durchführung', 'Übergabe planbar'],
  },
  {
    title: 'Gewerbe / Büro',
    price: 'ab 799 €',
    note: 'Räumung von Flächen, Lager, Büro',
    items: ['diskret', 'außerhalb Zeiten möglich', 'z. B. Archiv/Inventar'],
  },
]

const TESTIMONIALS = [
  {
    name: 'Kundin aus Hannover',
    title: 'Wohnungsentrümpelung',
    text: '„Sehr schnell und absolut sauber. Fixpreis wurde eingehalten und die Übergabe war stressfrei.“',
  },
  {
    name: 'Kunde aus Braunschweig',
    title: 'Keller & Dachboden',
    text: '„In einem Termin alles raus. Super organisiert – ich war echt überrascht, wie flott das ging.“',
  },
  {
    name: 'Gewerbekunde',
    title: 'Büro-Räumung',
    text: '„Diskret, pünktlich, effizient. Wir konnten normal weiterarbeiten. Klare Empfehlung.“',
  },
]

const FAQS = [
  {
    q: 'Wie schnell geht ein Termin?',
    a: 'Je nach Auslastung oft innerhalb von 24–72 Stunden. Bei Bedarf planen wir auch Express-Termine.',
  },
  {
    q: 'Gibt es einen Festpreis?',
    a: 'In vielen Fällen ja: per Fotos/Video oder kurzer Begehung kalkulieren wir transparent. Keine Überraschungen.',
  },
  {
    q: 'Muss ich vor Ort sein?',
    a: 'Nicht zwingend. Wichtig ist nur Zugang/Schlüsselregelung. Details klären wir beim Rückruf.',
  },
  {
    q: 'Entsorgt ihr alles fachgerecht?',
    a: 'Ja – wir kümmern uns um Abtransport und Entsorgung. Belege/Nachweise sind auf Wunsch möglich.',
  },
  {
    q: 'Bietet ihr eine anschließende Reinigung an?',
    a: 'Ja, optional: Endreinigung/Übergabereinigung, damit Sie direkt übergeben oder renovieren können.',
  },
  {
    q: 'Was beeinflusst den Preis?',
    a: 'Menge/Volumen, Etagen, Laufwege, Parkmöglichkeit, Sondermüll/Schweres sowie gewünschte Zusatzleistungen (z. B. Reinigung).',
  },
]

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-xl border border-black/10 bg-white text-[12px] shadow-sm"
        aria-hidden
        style={{ color: BRAND.ink }}
      >
        <span style={{ color: BRAND.accent }}>✓</span>
      </span>
      <div className="text-sm leading-6 text-zinc-700">{children}</div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[12px] text-zinc-700 shadow-sm backdrop-blur">
      {children}
    </span>
  )
}

export default function Home() {
  const CONTAINER = 'mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10'
  const phoneHref = `tel:${BRAND.phone.replace(/\s+/g, '')}`

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Background FX (hell, clean) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* soft blobs */}
        <div
          className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 62%)`,
          }}
        />
        <div
          className="absolute -right-28 top-10 h-[560px] w-[560px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 40% 30%, rgba(11,15,25,0.35), transparent 62%)`,
          }}
        />
        <div
          className="absolute left-1/2 top-[560px] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND.accent}, transparent 64%)`,
          }}
        />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(0,0,0,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.22)_1px,transparent_1px)] [background-size:56px_56px]" />
        {/* top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_0%,rgba(249,167,39,0.18),transparent_60%)]" />
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/80 backdrop-blur-xl md:hidden">
        <div className={`${CONTAINER} flex gap-3 py-3`}>
          <a
            href={phoneHref}
            className="flex-1 rounded-2xl border border-black/12 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
          >
            Anrufen
          </a>
          <a
            href="#anfrage"
            className="flex-1 rounded-2xl px-4 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
            style={{ backgroundColor: BRAND.accent }}
          >
            Sofort anfragen
          </a>
        </div>
      </div>

      {/* HERO + FORM */}
      <section className={`${CONTAINER} pb-10 pt-10 md:pb-14 md:pt-16`}>
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          {/* Left: Copy */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-zinc-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
              Entrümpelung ohne Stress – schnell, sauber, planbar
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Entrümpelung, die{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BRAND.accent}, ${BRAND.ink})`,
                }}
              >
                richtig schnell.
              </span>{' '}
              geht.
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-700 md:text-lg">
              Wohnung, Haus, Keller, Dachboden oder Gewerbe: Wir entrümpeln zügig, strukturiert und sauber. Sie
              bekommen eine klare Kommunikation, einen planbaren Termin und auf Wunsch eine besenreine Übergabe –
              optional inklusive Endreinigung.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Pill>⚡ Schnell • Oft 24–72h</Pill>
              <Pill>💬 Fixpreis möglich</Pill>
              <Pill>🧹 Besenrein • optional Reinigung</Pill>
              <Pill>♻️ Entsorgung inkl.</Pill>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold">Kurzfristige Termine</div>
                <div className="mt-1 text-sm text-zinc-700">Oft 24–72h – ideal, wenn es schnell gehen muss.</div>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold">Transparente Preise</div>
                <div className="mt-1 text-sm text-zinc-700">Fixpreis nach Fotos/Begehung – fair, nachvollziehbar.</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Check>
                Fokus auf <strong className="font-semibold text-zinc-900">schnelle Entrümpelung</strong> – keine
                unnötigen Schleifen, keine Zeitverschwendung.
              </Check>
              <Check>
                <strong className="font-semibold text-zinc-900">Optional: Endreinigung</strong> direkt im Anschluss –
                ideal für Übergabe oder Renovierung.
              </Check>
              <Check>
                <strong className="font-semibold text-zinc-900">Entsorgung inklusive</strong> – sauber abgewickelt, auf
                Wunsch mit Nachweisen.
              </Check>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#anfrage"
                className="rounded-2xl px-5 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
                style={{ backgroundColor: BRAND.accent }}
              >
                Kostenlos anfragen
              </a>
              <a
                href={phoneHref}
                className="rounded-2xl border border-black/12 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
              >
                Sofort anrufen
              </a>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Hinweis: Region/Ort bitte im Formular angeben (PLZ). Inhalte für SEO sind vorbereitet – Ort(e) können Sie
              später gezielt ergänzen.
            </p>
          </div>

          {/* Right: Form */}
          <div
            id="anfrage"
            className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/75 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:p-6"
          >
            {/* soft border sheen */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.06), rgba(255,255,255,0.0) 45%, rgba(0,0,0,0.05))',
              }}
            />
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-25"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${BRAND.accent}, transparent 65%)`,
              }}
            />
            <div
              className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full blur-3xl opacity-15"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(11,15,25,0.35), transparent 65%)`,
              }}
            />

            <div className="relative">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

  {/* ✅ TEAM-BOX direkt nach Hero (volle Breite, Bild 1/3 • Text 2/3, Bild oben ausgerichtet, kein CTA außer Anruf) */}
<section className={`${CONTAINER} pb-10 md:pb-14`}>
  <div className="w-full">
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white/70 shadow-sm backdrop-blur">
      {/* Desktop: 1/3 Bild, 2/3 Text | Mobile: Bild oben */}
      <div className="grid md:grid-cols-3">
        {/* Bild (1/3) */}
        <div className="relative md:col-span-1">
          <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
            <Image
              src="/bilder/team.png"
              alt="Team von RümpelTurbo"
              fill
              className="object-cover object-top"
              sizes="(min-width: 768px) 33vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* Text (2/3) */}
        <div className="p-6 md:col-span-2 md:p-8">
          <div className="text-sm font-semibold text-zinc-900">Unser Team</div>

          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            Eingespielt. Schnell. Sauber.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-700 md:text-base md:leading-7">
            Wir sind ein kleines, eingespieltes Team für Entrümpelungen – von Wohnung und Haus bis Keller, Dachboden und
            Gewerbe. Unser Fokus: <b>klare Absprachen</b>, <b>zügige Durchführung</b> und auf Wunsch eine{' '}
            <b>besenreine Übergabe</b>.
          </p>

          <div className="mt-5 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
              Fixpreis nach Fotos/Begehung möglich
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
              Kurzfristige Termine (je nach Auslastung)
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
              Entsorgung inkl. – optional Endreinigung
            </div>
          </div>

          {/* nur Anruf-Button */}
          <div className="mt-6">
            <a
              href={phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-black/12 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 sm:w-auto"
            >
              📞 {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Social Proof / Trust strip */}
      <section className={`${CONTAINER} pb-10 md:pb-14`}>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { k: '24–72h', v: 'häufig kurzfristig' },
            { k: 'Fixpreis', v: 'transparent kalkuliert' },
            { k: 'Besenrein', v: 'saubere Übergabe' },
            { k: 'Optional', v: 'Endreinigung möglich' },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <div className="text-2xl font-semibold" style={{ color: BRAND.ink }}>
                <span style={{ color: BRAND.accent }}>{x.k}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-700">{x.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className={`${CONTAINER} scroll-mt-28 pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Leistungen für schnelle Entrümpelung</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">
            Alles aus einer Hand – Fokus: zügig entrümpeln, sauber verlassen. Optional ergänzbar um eine Endreinigung.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-[26px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl opacity-0 transition group-hover:opacity-20"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${BRAND.accent}, transparent 62%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-zinc-900 shadow-sm"
                    aria-hidden
                  >
                    <span className="text-[18px] leading-none">⚡</span>
                  </span>
                  <div className="text-base font-semibold text-zinc-900">{s.title}</div>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-700">{s.text}</p>

                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-zinc-700">
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND.accent }} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold">Optional: Endreinigung / Übergabereinigung direkt im Anschluss</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Sie möchten das Objekt direkt übergeben oder renovieren? Wir können nach der Entrümpelung eine Reinigung
                ergänzen (je nach Bedarf als Endreinigung oder Übergabereinigung).
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Check>Ideal für Vermieter/Übergabe/Verkauf</Check>
                <Check>Ein Termin statt zwei Dienstleister</Check>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="#anfrage"
                className="rounded-2xl px-5 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
                style={{ backgroundColor: BRAND.accent }}
              >
                Reinigung mit anfragen
              </a>
              <a
                href="#kosten"
                className="rounded-2xl border border-black/12 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
              >
                Kosten ansehen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section id="ablauf" className={`${CONTAINER} scroll-mt-28 pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Ablauf: schnell, klar, planbar</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">Ein einfacher Prozess – damit die Entrümpelung schnell erledigt ist.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="relative rounded-[26px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <div className="text-xs font-semibold text-zinc-500">{s.step}</div>
              <div className="mt-2 text-base font-semibold text-zinc-900">{s.title}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-700">{s.text}</div>

              <div
                className="pointer-events-none absolute inset-x-6 bottom-6 h-[2px] rounded-full opacity-70"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BRAND.accent}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: 'Besenrein möglich', text: 'Sauberer Abschluss – perfekt für Übergabe oder Renovierung.' },
            { title: 'Diskret & effizient', text: 'Gewerbe/Büro auch außerhalb Ihrer Zeiten.' },
            { title: 'Optional: Endreinigung', text: 'Ein Termin, alles erledigt – auf Wunsch mit Reinigung.' },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-[26px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <div className="text-base font-semibold text-zinc-900">{x.title}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-700">{x.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kosten */}
      <section id="kosten" className={`${CONTAINER} scroll-mt-28 pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Kosten: Richtwerte ab</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">
            Die finalen Kosten hängen von Menge, Etagen, Laufwegen und Zusatzwünschen ab. Hier sind typische Richtwerte –
            transparent und eher „relativ günstig“ gehalten. Fixpreis nach Fotos/Begehung.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full blur-3xl opacity-0 transition group-hover:opacity-20"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${BRAND.accent}, transparent 62%)`,
                }}
              />
              <div className="relative">
                <div className="text-sm font-semibold text-zinc-900">{p.title}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-3xl font-semibold" style={{ color: BRAND.ink }}>
                    <span style={{ color: BRAND.accent }}>{p.price}</span>
                  </div>
                  <div className="text-xs text-zinc-500">zzgl. Sonderfälle</div>
                </div>
                <div className="mt-2 text-sm text-zinc-700">{p.note}</div>

                <ul className="mt-5 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-zinc-700">
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND.accent }} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href="#anfrage"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
                  style={{ backgroundColor: BRAND.accent }}
                >
                  Fixpreis anfragen
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galerie */}
      <section className={`${CONTAINER} pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Vorher / Nachher (Beispiele)</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">Hier können Sie später echte Fotos einbauen. Platzhalter sind vorbereitet.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: 'Keller entrümpeln', a: '/bilder/Vorher_Keller.png', b: '/bilder/Nachher_Keller.png' },
            { title: 'Wohnung entrümpeln', a: '/bilder/Vorher_Wohnung.png', b: '/bilder/Nachher_Wohnung.png' },
          ].map((g) => (
            <div key={g.title} className="rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 text-sm font-semibold text-zinc-900">{g.title}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <div className="px-3 py-2 text-xs text-zinc-500">Vorher</div>
                  <div className="relative aspect-[16/10]">
                    <Image src={g.a} alt={`${g.title} vorher`} fill className="object-cover" />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <div className="px-3 py-2 text-xs text-zinc-500">Nachher</div>
                  <div className="relative aspect-[16/10]">
                    <Image src={g.b} alt={`${g.title} nachher`} fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Entsorgung inkl.</Pill>
                <Pill>Besenrein optional</Pill>
                <Pill>Fixpreis möglich</Pill>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bewertungen */}
      <section className={`${CONTAINER} pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Das sagen Kunden</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">Schnelligkeit, Sauberkeit, Planbarkeit – genau darauf ist RümpelTurbo gebaut.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name + t.title}
              className="relative rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <div className="text-sm font-semibold text-zinc-900">{t.title}</div>
              <p className="mt-3 text-sm leading-6 text-zinc-700">{t.text}</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-xs text-zinc-500">{t.name}</div>
                <div className="flex gap-1 text-sm" aria-label="5 Sterne Bewertung">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} style={{ color: BRAND.accent }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`${CONTAINER} scroll-mt-28 pb-10 md:pb-14`}>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">FAQ zur Entrümpelung</h2>
          <p className="mt-2 max-w-2xl text-zinc-700">Die häufigsten Fragen – kurz und klar beantwortet.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-[26px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-semibold text-zinc-900">{f.q}</span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white text-zinc-900 shadow-sm transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Spacer for mobile sticky bar */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
