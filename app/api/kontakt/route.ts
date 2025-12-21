// src/app/api/kontakt/route.ts
import { NextResponse } from 'next/server'
import {
  getRuempelTurboCustomerSubject,
  getRuempelTurboInternalSubject,
  renderRuempelTurboCustomerMail,
  renderRuempelTurboInternalMail,
  RUEMPELTURBO_SUPPORT_EMAIL,
  type InquiryCtx,
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

function isEmailLike(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function parseBool(v: unknown) {
  return v === true || v === 'true' || v === 'on' || v === '1' || v === 1
}

function pickStr(fd: FormData, key: string) {
  const v = fd.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

function wantsHtmlRedirect(req: Request) {
  const accept = req.headers.get('accept') || ''
  return accept.includes('text/html')
}

function getSiteUrl(req: Request) {
  const origin = (req.headers.get('origin') || '').trim()
  const env = (process.env.NEXT_PUBLIC_SITE_URL || '').trim()
  return (env || origin || 'https://ruempelturbo.de').trim()
}

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
      ...(args.replyTo ? { reply_to: args.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Resend error: ${res.status} ${res.statusText} ${text}`)
  }
}

export async function POST(req: Request) {
  const from = (process.env.RESEND_FROM || '').trim()
  const toInternal = (process.env.CONTACT_TO || RUEMPELTURBO_SUPPORT_EMAIL || '').trim()
  const sendConfirmation = parseBool(process.env.SEND_CONTACT_CONFIRMATION ?? 'true')

  if (!from) {
    return NextResponse.json({ ok: false, error: 'RESEND_FROM fehlt' }, { status: 500 })
  }
  if (!toInternal) {
    return NextResponse.json({ ok: false, error: 'CONTACT_TO fehlt' }, { status: 500 })
  }

  try {
    const fd = await req.formData()

    // optional: honeypot (wenn du später im Formular ein hidden "website" ergänzt)
    const hp = pickStr(fd, 'website') || pickStr(fd, 'company') || pickStr(fd, 'hp')
    if (hp) {
      if (wantsHtmlRedirect(req)) {
        const url = new URL('/danke', req.url)
        url.searchParams.set('sent', '1')
        url.searchParams.set('src', 'kontakt')
        return NextResponse.redirect(url, { status: 303 })
      }
      return NextResponse.json({ ok: true }, { status: 200 })
    }

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

    if (email && !isEmailLike(email)) {
      return NextResponse.json({ ok: false, error: 'E-Mail ist ungültig.' }, { status: 400 })
    }

    const ctx: InquiryCtx = {
      customerType: 'privat', // Kontaktformular hat keinen Privat/Gewerbe Toggle → default
      source,
      firstName,
      lastName,
      phone,
      email: email || undefined,
      location: location || undefined,
      message: message || undefined,
      siteUrl: getSiteUrl(req),
    }

    // 1) Intern (immer)
    await sendWithResend({
      from,
      to: toInternal,
      subject: getRuempelTurboInternalSubject(ctx),
      html: renderRuempelTurboInternalMail(ctx),
      replyTo: email || undefined,
    })

    // 2) Kunden-Mail (nur wenn E-Mail vorhanden + env erlaubt)
    if (sendConfirmation && email) {
      await sendWithResend({
        from,
        to: email,
        subject: getRuempelTurboCustomerSubject(ctx),
        html: renderRuempelTurboCustomerMail(ctx),
      })
    }

    // Klassisches <form> → Redirect auf Danke
    if (wantsHtmlRedirect(req)) {
      const url = new URL('/danke', req.url)
      url.searchParams.set('sent', '1')
      url.searchParams.set('src', source)
      return NextResponse.redirect(url, { status: 303 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: 'Mail send failed.', details: String(e?.message || e) },
      { status: 500 }
    )
  }
}
