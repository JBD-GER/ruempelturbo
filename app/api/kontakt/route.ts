// src/app/api/anfrage/route.ts
import { NextResponse } from 'next/server'
import {
  getRuempelTurboCustomerSubject,
  getRuempelTurboInternalSubject,
  renderRuempelTurboCustomerMail,
  renderRuempelTurboInternalMail,
  RUEMPELTURBO_SUPPORT_EMAIL,
  type InquiryCustomerType,
} from '@/app/mails/emailTemplates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type SendEmailArgs = {
  from: string
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

/**
 * ✅ Resend REST API
 * ENV:
 * - RESEND_API_KEY=re_...
 * - MAIL_FROM="RümpelTurbo <no-reply@ruempelturbo.de>" (optional)
 * - NEXT_PUBLIC_SITE_URL="https://ruempelturbo.de" (optional)
 */
async function sendWithResend(args: SendEmailArgs) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY fehlt')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: args.from,
      to: args.to,
      subject: args.subject,
      html: args.html,
      // Resend REST parameter: reply_to
      ...(args.replyTo ? { reply_to: args.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Resend error: ${res.status} ${res.statusText} ${text}`)
  }
}

function pickStr(fd: FormData, key: string) {
  const v = fd.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

function isEmailLike(v: string) {
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function normalizeCustomerType(v: string): InquiryCustomerType | undefined {
  const x = (v || '').toLowerCase().trim()
  if (x === 'privat' || x === 'gewerbe') return x
  return undefined
}

function wantsHtmlRedirect(req: Request) {
  const accept = req.headers.get('accept') || ''
  return accept.includes('text/html')
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData()

    // Pflichtfelder
    const firstName = pickStr(fd, 'firstName')
    const lastName = pickStr(fd, 'lastName')
    const phone = pickStr(fd, 'phone')

    const dsgvo = fd.get('dsgvo')
    const dsgvoOk = dsgvo === 'on' || dsgvo === 'true' || dsgvo === '1'

    if (!firstName || !lastName || !phone || !dsgvoOk) {
      return NextResponse.json(
        { ok: false, error: 'Pflichtfelder fehlen (Vorname, Nachname, Telefon, DSGVO).' },
        { status: 400 }
      )
    }

    // Optional
    const email = pickStr(fd, 'email')
    const location = pickStr(fd, 'location')
    const message = pickStr(fd, 'message')
    const source = pickStr(fd, 'source') || 'kontakt'
    const customerType = normalizeCustomerType(pickStr(fd, 'customerType')) // optional (falls du später ergänzt)

    if (email && !isEmailLike(email)) {
      return NextResponse.json({ ok: false, error: 'E-Mail ist ungültig.' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || ''
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || origin || 'https://ruempelturbo.de').trim()

    const ctx = {
      customerType: customerType ?? 'privat', // default
      source,
      firstName,
      lastName,
      phone,
      email: email || undefined,
      location: location || undefined,
      message: message || undefined,
      siteUrl,
    }

    const from = process.env.MAIL_FROM || `${'RümpelTurbo'} <${RUEMPELTURBO_SUPPORT_EMAIL}>`

    // 1) Interne Mail (immer)
    await sendWithResend({
      from,
      to: RUEMPELTURBO_SUPPORT_EMAIL,
      subject: getRuempelTurboInternalSubject(ctx),
      html: renderRuempelTurboInternalMail(ctx),
      replyTo: email || undefined,
    })

    // 2) Kunden-Mail (nur wenn E-Mail vorhanden)
    if (email) {
      await sendWithResend({
        from,
        to: email,
        subject: getRuempelTurboCustomerSubject(ctx),
        html: renderRuempelTurboCustomerMail(ctx),
      })
    }

    // Klassisches <form action="..."> → Redirect
    if (wantsHtmlRedirect(req)) {
      const url = new URL('/danke', req.url)
      url.searchParams.set('sent', '1')
      url.searchParams.set('src', source)
      return NextResponse.redirect(url, { status: 303 })
    }

    // fetch/json
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
