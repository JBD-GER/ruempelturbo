'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const BRAND = {
  name: 'RÜMPELTURBO',
  accent: '#f9a727',
  phone: '+4950353169998',
}

type NavItem = { href: string; label: string }

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // ✅ immer /#... damit es von Impressum/Datenschutz aus funktioniert
  const navItems: NavItem[] = useMemo(
    () => [
      { href: '/#leistungen', label: 'Leistungen' },
      { href: '/#ablauf', label: 'Ablauf' },
      { href: '/#kosten', label: 'Kosten' },
      { href: '/#faq', label: 'FAQ' },
    ],
    []
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const top = !scrolled
  const phoneHref = `tel:${BRAND.phone.replace(/\s+/g, '')}`

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cx(
          'transition-all duration-300',
          top
            ? 'border-b border-white/10 bg-zinc-950/70 backdrop-blur-2xl'
            : 'border-b border-black/10 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-2xl'
        )}
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
            {/* Logo + Brand */}
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2.5"
              aria-label={`${BRAND.name} Startseite`}
              onClick={() => setOpen(false)}
            >
              <Image
                src="/logo.png"
                alt={`${BRAND.name} Logo`}
                width={52}
                height={52}
                quality={100}
                priority
                className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
              />

              <div className="min-w-0 leading-tight">
                <div
                  className={cx(
                    'truncate text-[15px] font-semibold tracking-tight transition-colors sm:text-base',
                    top ? 'text-white' : 'text-zinc-900'
                  )}
                >
                  {BRAND.name}
                </div>
                <div
                  className={cx(
                    'truncate text-[11px] transition-colors sm:text-[12px]',
                    top ? 'text-white/70' : 'text-zinc-600'
                  )}
                >
                  TURBOSCHNELL ENTRÜMPELT
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    'transition-colors',
                    top ? 'text-white/80 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href={phoneHref}
                className={cx(
                  'inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition',
                  top
                    ? 'border border-white/15 bg-white/10 text-white hover:bg-white/15'
                    : 'border border-black/12 bg-white text-zinc-900 hover:bg-zinc-50'
                )}
              >
                📞 Anrufen
              </a>

              {/* ✅ immer /#anfrage */}
              <Link
                href="/#anfrage"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold text-black shadow-sm transition hover:opacity-95"
                style={{ backgroundColor: BRAND.accent }}
              >
                Kostenlos anfragen
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className={cx(
                'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition',
                top
                  ? 'border border-white/15 bg-white/10 hover:bg-white/15'
                  : 'border border-black/12 bg-white hover:bg-zinc-50'
              )}
              onClick={() => setOpen((v) => !v)}
              aria-label="Navigation öffnen"
              aria-expanded={open}
            >
              <div className="space-y-1.5">
                <span className={cx('block h-0.5 w-5 rounded-full transition-colors', top ? 'bg-white' : 'bg-zinc-900')} />
                <span
                  className={cx(
                    'block h-0.5 w-4 rounded-full transition-colors',
                    top ? 'bg-white/75' : 'bg-zinc-700'
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Akzentlinie nur wenn gescrolled */}
        <div className={cx(scrolled ? 'h-[2px] w-full opacity-70' : 'h-[2px] w-full opacity-0')}
          style={{ backgroundImage: `linear-gradient(90deg, transparent, ${BRAND.accent}, transparent)` }}
        />
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
          />

          <div className="absolute left-0 right-0 top-0 border-b border-black/10 bg-white/95 backdrop-blur-2xl">
            <div className="w-full px-4 sm:px-6">
              <div className="flex items-center justify-between py-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Image
                    src="/logo.png"
                    alt={`${BRAND.name} Logo`}
                    width={56}
                    height={56}
                    quality={100}
                    priority
                    className="h-11 w-11 shrink-0 object-contain"
                  />
                  <div className="min-w-0 leading-tight">
                    <div className="truncate text-sm font-semibold text-zinc-900">{BRAND.name}</div>
                    <div className="truncate text-[11px] text-zinc-600">Schnelle Entrümpelung</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white shadow-sm transition hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                  aria-label="Menü schließen"
                >
                  ✕
                </button>
              </div>

              <nav className="pb-5">
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 grid gap-2">
                  <a
                    href={phoneHref}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-black/12 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
                  >
                    📞 Jetzt anrufen
                  </a>

                  {/* ✅ immer /#anfrage */}
                  <Link
                    href="/#anfrage"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-95"
                    style={{ backgroundColor: BRAND.accent }}
                  >
                    Kostenlos anfragen
                  </Link>

                  <div className="mt-1 text-center text-xs text-zinc-500">
                    Oft kurzfristig (24–72h) • Fixpreis nach Fotos/Begehung
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
