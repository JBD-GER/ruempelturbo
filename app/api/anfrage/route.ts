// src/app/api/anfrage/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  renderRuempelTurboCustomerMail,
  renderRuempelTurboInternalMail,
  getRuempelTurboCustomerSubject,
  getRuempelTurboInternalSubject,
  RUEMPELTURBO_SUPPORT_EMAIL,
  type InquiryCtx,
} from '@/app/mails/emailTemplates'

export const runtime = 'nodejs'

function isValidEmail(email: string) {
  // bewusst simple (und robust) Validierung
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizePhone(phone: string) {
  return (phone || '').trim()
}

function pickString(v: unknown) {
  if (typeof v === 'string') return v.trim()
  return ''
}

async function readBody(req: Request): Promise<Record<string, unknown>> {
  const ct = req.headers.get('content-type') || ''
  try {
    if (ct.includes('application/json')) {
      return (await req.json()) as Record<string, unknown>
    }
    if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
      const fd = await req.formData()
      const out: Record<string, unknown> = {}
      fd.forEach((value, key) => {
        out[key] = typeof value === 'string' ? value : ''
      })
      return out
    }
  } catch {
    // ignore
  }
  return {}
}

export async function POST(req: Request) {
  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM

  if (!resendKey || !from) {
    return NextResponse.json(
      { ok: false, error: 'Server mail config missing (RESEND_API_KEY / RESEND_FROM).' },
      { status: 500 }
    )
  }

  const body = await readBody(req)

  // Honeypot (Spambots)
  const hp = pickString(body.website || body.company || body.hp)
  if (hp) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const firstName = pickString(body.firstName)
  const lastName = pickString(body.lastName)
  const phone = normalizePhone(pickString(body.phone))
  const emailRaw = pickString(body.email)
  const email = emailRaw ? emailRaw.toLowerCase() : ''
  const location = pickString(body.location)
  const message = pickString(body.message)

  const dsgvoRaw = body.dsgvo
  const dsgvo =
    dsgvoRaw === true ||
    dsgvoRaw === 'true' ||
    dsgvoRaw === 'on' ||
    dsgvoRaw === '1' ||
    dsgvoRaw === 1

  // Pflichtfelder
  const errors: Record<string, string> = {}
  if (!firstName) errors.firstName = 'Vorname ist Pflicht.'
  if (!lastName) errors.lastName = 'Nachname ist Pflicht.'
  if (!phone) errors.phone = 'Telefonnummer ist Pflicht.'
  if (!dsgvo) errors.dsgvo = 'DSGVO-Zustimmung ist Pflicht.'

  if (email && !isValidEmail(email)) {
    errors.email = 'E-Mail ist ungültig.'
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const ctx: InquiryCtx = {
    firstName,
    lastName,
    phone,
    email: email || undefined,
    location: location || undefined,
    message: message || undefined,
    siteUrl: req.headers.get('origin') || 'https://ruempelturbo.de',
  }

  const resend = new Resend(resendKey)

  try {
    // 1) Intern
    await resend.emails.send({
      from,
      to: [RUEMPELTURBO_SUPPORT_EMAIL],
      subject: getRuempelTurboInternalSubject(ctx),
      html: renderRuempelTurboInternalMail(ctx),
      replyTo: email ? email : undefined, // wenn vorhanden
    })

    // 2) Customer confirmation (nur wenn email vorhanden)
    let sentCustomer = false
    if (email) {
      await resend.emails.send({
        from,
        to: [email],
        subject: getRuempelTurboCustomerSubject(ctx),
        html: renderRuempelTurboCustomerMail(ctx),
      })
      sentCustomer = true
    }

    return NextResponse.json({ ok: true, sentCustomer }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: 'Mail send failed.', details: String(e?.message || e) },
      { status: 500 }
    )
  }
}
