// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Header from './components/Header'
import Footer from './components/Footer'
import ConsentBanner from './components/ConsentBanner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RÜMPELTURBO – schnelle Entrümpelung mit Fixpreis',
    template: '%s | RÜMPELTURBO',
  },
  description:
    'Schnelle Entrümpelung für Wohnung, Haus, Keller, Dachboden & Gewerbe. Kurzfristige Termine, transparente Fixpreise, besenrein. Optional: Endreinigung. Kostenlos anfragen.',
  applicationName: 'RÜMPELTURBO',
  metadataBase: new URL('https://ruempelturbo.de'),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'RÜMPELTURBO – schnelle Entrümpelung mit Fixpreis',
    description:
      'Wohnung • Haus • Keller • Dachboden • Gewerbe. Kurzfristig, sauber, besenrein. Optional: Endreinigung.',
    url: 'https://ruempelturbo.de',
    siteName: 'RÜMPELTURBO',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RÜMPELTURBO – schnelle Entrümpelung mit Fixpreis',
    description:
      'Kurzfristige Entrümpelung mit Fixpreis möglich. Optional Endreinigung. Kostenlos anfragen.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD LocalBusiness (SEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RümpelTurbo',
    description:
      'Schnelle Entrümpelung für Wohnung, Haus, Keller, Dachboden & Gewerbe. Fixpreis möglich. Optional: Endreinigung.',
    url: 'https://ruempelturbo.de',
    areaServed: 'Deutschland',
    // später ergänzen: address, telephone, openingHours, priceRange
  }

  return (
    <html lang="de" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-white text-slate-900 antialiased`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ✅ Global Header */}
        <Header />

        {/* ✅ Page content */}
        <main className="min-h-[calc(100vh-160px)]">{children}</main>

        {/* ✅ Global Footer */}
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  )
}
