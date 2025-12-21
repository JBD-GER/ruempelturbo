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
  type InquiryCustomerType,
} from '@/app/mails/emailTemplates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizePhone(phone: string) {
  return (phone || '').trim()
}

function pickString(v: unknown) {
  if (typeof v === 'string') return v.trim()
  return ''
}

function parseBool(v: unknown) {
  return v === true || v === 'true' || v === 'on' || v === '1' || v === 1
}

function normalizeCustomerType(v: unknown): InquiryCustomerType | undefined {
  const x = pickString(v).toLowerCase()
  if (x === 'privat' || x === 'gewerbe') return x
  return undefined
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

  // optional: intern an ENV statt hardcoded
  const toInternal = (process.env.CONTACT_TO || RUEMPELTURBO_SUPPORT_EMAIL || '').trim()

  // optional: Kundenbestätigung per ENV abschaltbar
  const sendConfirmation = parseBool(process.env.SEND_CONTACT_CONFIRMATION ?? 'true')

  if (!resendKey || !from) {
    return NextResponse.json(
      { ok: false, error: 'Server mail config missing (RESEND_API_KEY / RESEND_FROM).' },
      { status: 500 }
    )
  }
  if (!toInternal) {
    return NextResponse.json({ ok: false, error: 'CONTACT_TO missing.' }, { status: 500 })
  }

  const body = await readBody(req)

  // Honeypot (Spambots)
  const hp = pickString((body as any).website || (body as any).company || (body as any).hp)
  if (hp) {
    return NextResponse.json({ ok: true, sentCustomer: false }, { status: 200 })
  }

  const customerType = normalizeCustomerType((body as any).customerType) // ✅ jetzt korrekt typisiert
  const firstName = pickString((body as any).firstName)
  const lastName = pickString((body as any).lastName)
  const phone = normalizePhone(pickString((body as any).phone))
  const emailRaw = pickString((body as any).email)
  const email = emailRaw ? emailRaw.toLowerCase() : ''
  const location = pickString((body as any).location)
  const message = pickString((body as any).message)

  const dsgvo = parseBool((body as any).dsgvo)

  // Pflichtfelder
  const errors: Record<string, string> = {}
  if (!customerType) errors.customerType = 'Bitte Privat oder Gewerbe auswählen.'
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
    customerType, // ✅ kein "" mehr → TS OK
    source: 'anfrage',
    firstName,
    lastName,
    phone,
    email: email || undefined,
    location: location || undefined,
    message: message || undefined,
    siteUrl: req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://ruempelturbo.de',
  }

  const resend = new Resend(resendKey)

  try {
    // 1) Intern
    await resend.emails.send({
      from,
      to: [toInternal],
      subject: getRuempelTurboInternalSubject(ctx),
      html: renderRuempelTurboInternalMail(ctx),
      replyTo: email ? email : undefined,
    })

    // 2) Customer confirmation (nur wenn email vorhanden + env erlaubt)
    let sentCustomer = false
    if (sendConfirmation && email) {
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
