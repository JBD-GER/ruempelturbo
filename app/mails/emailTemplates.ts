// src/app/mails/emailTemplates.ts

export type InquiryCustomerType = 'privat' | 'gewerbe'

export type InquiryCtx = {
  customerType?: InquiryCustomerType // ✅ jetzt optional (default: privat)
  source?: string // ✅ neu (z.B. "kontakt", "landing", ...)
  firstName: string
  lastName: string
  phone: string
  email?: string
  location?: string
  message?: string
  siteUrl?: string
}

const BRAND = {
  name: 'RümpelTurbo',
  websiteTitle: 'RümpelTurbo',
  supportEmail: 'info@ruempelturbo.de',
  phone: '+4950353169998',
  legalNote: '© RümpelTurbo • DSGVO-konform',

  accent: '#f9a727',
  bg: '#ffffff',
  card: '#ffffff',
  border: '#E5E7EB',
  text: '#0B1220',
  muted: '#6B7280',
}

const DEFAULT_SITE_URL = 'https://ruempelturbo.de'
const CONTAINER_W = 640

function escapeHtml(s: string) {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  return (s || '').replace(/[&<>"]/g, (c) => map[c] ?? c)
}

function nl2br(s: string) {
  return escapeHtml(s).replace(/\n/g, '<br/>')
}

function normalizeSiteUrl(input?: string) {
  let url = (input || '').trim()
  if (!url) url = DEFAULT_SITE_URL
  if (url.includes('localhost') || url.includes('127.0.0.1')) url = DEFAULT_SITE_URL
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  return url.replace(/\/+$/, '')
}

function formatCustomerType(v?: InquiryCustomerType) {
  const x = v ?? 'privat'
  return x === 'gewerbe' ? 'Gewerbe' : 'Privat'
}

function divider(px = 22) {
  return `
  <tr>
    <td style="padding:0 ${px}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="border-top:1px solid ${BRAND.border};font-size:0;line-height:0;height:1px;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>`
}

function h1(text: string, px = 22) {
  return `
  <tr>
    <td class="px" style="padding:0 ${px}px 10px ${px}px;">
      <div class="t" style="
        font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        font-size:22px;line-height:1.28;color:${BRAND.text};font-weight:800;
      ">${text}</div>
    </td>
  </tr>`
}

function p(text: string, px = 22) {
  return `
  <tr>
    <td class="px" style="padding:0 ${px}px 12px ${px}px;">
      <div style="
        font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        font-size:14px;line-height:1.65;color:${BRAND.text};font-weight:500;
      ">${text}</div>
    </td>
  </tr>`
}

function sectionTitle(text: string, px = 22) {
  return `
  <tr>
    <td class="px" style="padding:14px ${px}px 6px ${px}px;">
      <div style="
        font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        font-size:12px;line-height:1.2;color:${BRAND.text};font-weight:800;
        letter-spacing:.06em;text-transform:uppercase;
      ">${escapeHtml(text)}</div>
    </td>
  </tr>`
}

function field(label: string, valueHtml: string, px = 22, withTopBorder = true) {
  return `
  <tr>
    <td class="px" style="padding:0 ${px}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;${withTopBorder ? `border-top:1px solid ${BRAND.border};` : ''}">
            <div style="
              font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
              font-size:11px;line-height:1.3;color:${BRAND.text};font-weight:800;
              letter-spacing:.05em;text-transform:uppercase;margin:0 0 6px 0;
            ">${escapeHtml(label)}</div>

            <div style="
              font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
              font-size:14px;line-height:1.6;color:${BRAND.text};font-weight:600;
              word-break:break-word;
            ">${valueHtml}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`
}

function messageBox(messageHtml: string, px = 22) {
  return `
  <tr>
    <td class="px" style="padding:0 ${px}px 16px ${px}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">
        <tr>
          <td bgcolor="#FFFFFF" style="
            background:#FFFFFF;
            border:1px solid ${BRAND.border};
            border-radius:12px;
            padding:12px 14px;
            font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
            font-size:14px;line-height:1.7;color:${BRAND.text};
            word-break:break-word;
          ">${messageHtml}</td>
        </tr>
      </table>
    </td>
  </tr>`
}

function ctaButton(href: string, label: string, px = 22) {
  const safeHref = escapeHtml(href)
  return `
  <tr>
    <td class="px" style="padding:6px ${px}px 18px ${px}px;">
      <a href="${safeHref}" target="_blank" rel="noopener noreferrer"
        style="
          display:inline-block;
          background:${BRAND.accent};
          color:#0B1220 !important;
          text-decoration:none !important;
          font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
          font-size:14px;
          font-weight:800;
          border-radius:12px;
          padding:12px 16px;
        ">
        ${escapeHtml(label)}
      </a>
    </td>
  </tr>`
}

function baseWrap(preheader: string, title: string, contentRows: string, siteUrl?: string) {
  const base = normalizeSiteUrl(siteUrl)
  const logoUrl = `${base}/logo.png`

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
  <title>${escapeHtml(title)}</title>

  <style>
    @media only screen and (max-width: 680px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .px { padding-left: 16px !important; padding-right: 16px !important; }
      .t { font-size: 20px !important; line-height: 1.25 !important; }
    }
    a, a:visited { color: ${BRAND.text} !important; text-decoration: underline !important; }
    a[x-apple-data-detectors], .apple-link a, #MessageViewBody a {
      color: ${BRAND.text} !important;
      text-decoration: underline !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    @media (prefers-color-scheme: dark) {
      body, table, td, div { background: #FFFFFF !important; color: ${BRAND.text} !important; }
      .force-card { background:#FFFFFF !important; }
      a, a:visited { color: ${BRAND.text} !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;background:${BRAND.bg};color:${BRAND.text};
  -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${BRAND.bg}"
    style="background:${BRAND.bg};margin:0;padding:26px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">

        <table role="presentation" width="${CONTAINER_W}" cellpadding="0" cellspacing="0"
          class="container force-card" bgcolor="${BRAND.card}"
          style="width:${CONTAINER_W}px;max-width:${CONTAINER_W}px;margin:0 auto;background:${BRAND.card};
          border:1px solid ${BRAND.border};border-radius:18px;overflow:hidden;">

          <tr>
            <td style="height:4px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <tr>
            <td class="px" style="padding:18px 22px 10px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${logoUrl}" alt="${escapeHtml(BRAND.name)}" height="28"
                      style="display:block;height:28px;width:auto;border:0;outline:none;text-decoration:none;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
                      font-size:12px;line-height:1.4;color:${BRAND.text};font-weight:800;">
                      ${escapeHtml(BRAND.websiteTitle)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${contentRows}
        </table>

        <table role="presentation" width="${CONTAINER_W}" cellpadding="0" cellspacing="0" class="container"
          style="width:${CONTAINER_W}px;max-width:${CONTAINER_W}px;margin:14px auto 0;">
          <tr>
            <td align="center" style="padding:12px 10px;">
              <p style="margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
                font-size:12px;line-height:1.6;color:${BRAND.text};font-weight:700;">
                Fragen? Schreiben Sie uns an
                <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.text};text-decoration:underline;">${BRAND.supportEmail}</a>
              </p>
              <p style="margin:6px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
                font-size:11px;line-height:1.6;color:${BRAND.muted};">
                ${escapeHtml(BRAND.legalNote)}
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}

export function getRuempelTurboCustomerSubject(ctx: InquiryCtx) {
  const first = (ctx.firstName || '').trim()
  return first ? `Bestätigung: Anfrage erhalten – ${BRAND.name}` : `Anfrage erhalten – ${BRAND.name}`
}

export function getRuempelTurboInternalSubject(ctx: InquiryCtx) {
  const full = `${(ctx.firstName || '').trim()} ${(ctx.lastName || '').trim()}`.trim()
  const src = (ctx.source || '').trim()
  const srcPart = src ? ` (${src})` : ''
  return full ? `Neue Anfrage${srcPart} – ${full}` : `Neue Anfrage${srcPart} über Website`
}

export function renderRuempelTurboCustomerMail(ctx: InquiryCtx) {
  const fullName = `${ctx.firstName} ${ctx.lastName}`.trim()
  const base = normalizeSiteUrl(ctx.siteUrl)

  const companyTel = (BRAND.phone || '').trim()
  const companyTelLink = companyTel ? companyTel.replace(/\s+/g, '') : ''

  const rows = `
    ${h1(`Danke, ${escapeHtml(ctx.firstName)} — Ihre Anfrage ist eingegangen!`)}
    ${p(
      `Wir melden uns in der Regel <b>sehr schnell</b> bei Ihnen (meist am selben Tag). ` +
        `Wenn es besonders eilig ist, rufen Sie uns direkt an: ` +
        (companyTel
          ? `<a href="tel:${escapeHtml(companyTelLink)}" style="color:${BRAND.text};text-decoration:underline;">${escapeHtml(companyTel)}</a>.`
          : `<b>${escapeHtml(BRAND.name)}</b>.`)
    )}

    ${ctaButton(`${base}#anfrage`, 'Anfrage ergänzen (Fotos/Details)')}

    ${divider()}
    ${sectionTitle('Ihre Angaben')}
    ${field('Name', escapeHtml(fullName), 22, false)}
    ${field('Kundentyp', escapeHtml(formatCustomerType(ctx.customerType)))}
    ${field(
      'Telefon',
      ctx.phone?.trim()
        ? `<a href="tel:${escapeHtml(ctx.phone.trim().replace(/\s+/g, ''))}" style="color:${BRAND.text};text-decoration:underline;">${escapeHtml(ctx.phone.trim())}</a>`
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}
    ${field(
      'E-Mail (optional)',
      ctx.email?.trim()
        ? `<a href="mailto:${escapeHtml(ctx.email)}" style="color:${BRAND.text};text-decoration:underline;">${escapeHtml(ctx.email)}</a>`
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}
    ${field(
      'Ort / Objekt',
      ctx.location?.trim()
        ? escapeHtml(ctx.location)
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}

    ${
      ctx.message?.trim()
        ? `
          ${divider()}
          ${sectionTitle('Ihre Nachricht')}
          ${messageBox(nl2br(ctx.message))}
        `
        : ''
    }

    ${divider()}
    ${sectionTitle('Nächste Schritte')}
    ${p(
      `1) <b>Kurzer Rückruf</b> zur Abstimmung<br/>` +
        `2) <b>Fixpreis</b> (nach Fotos/Begehung möglich)<br/>` +
        `3) <b>Termin</b> – auf Wunsch <b>besenrein</b> und optional mit <b>Endreinigung</b>`
    )}

    ${divider()}
    ${p(
      `Tipp: Wenn Sie Fotos/Video senden möchten, antworten Sie einfach auf diese E-Mail ` +
        `oder schicken Sie die Bilder per WhatsApp (falls Sie das nutzen).`
    )}
  `

  return baseWrap(
    'Bestätigung: Ihre Anfrage ist eingegangen – wir melden uns schnell.',
    getRuempelTurboCustomerSubject(ctx),
    rows,
    ctx.siteUrl
  )
}

export function renderRuempelTurboInternalMail(ctx: InquiryCtx) {
  const fullName = `${ctx.firstName} ${ctx.lastName}`.trim()
  const submittedAt = new Date().toLocaleString('de-DE')
  const tel = (ctx.phone || '').trim()
  const src = (ctx.source || '').trim()

  const rows = `
    ${h1('Neue Anfrage über die Website')}
    <tr>
      <td class="px" style="padding:0 22px 12px 22px;">
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
          font-size:13px;line-height:1.65;color:${BRAND.text};font-weight:700;">
          Eingang: <b>${escapeHtml(submittedAt)}</b>
        </div>
      </td>
    </tr>

    ${divider()}
    ${sectionTitle('Kontakt')}
    ${field('Name', escapeHtml(fullName), 22, false)}
    ${field('Kundentyp', escapeHtml(formatCustomerType(ctx.customerType)))}
    ${field('Quelle', src ? escapeHtml(src) : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`)}
    ${field(
      'Telefon (Pflicht)',
      tel
        ? `<a href="tel:${escapeHtml(tel.replace(/\s+/g, ''))}" style="color:${BRAND.text};text-decoration:underline;">${escapeHtml(tel)}</a>`
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}
    ${field(
      'E-Mail (optional)',
      ctx.email?.trim()
        ? `<a href="mailto:${escapeHtml(ctx.email)}" style="color:${BRAND.text};text-decoration:underline;">${escapeHtml(ctx.email)}</a>`
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}
    ${field(
      'Ort / Objekt',
      ctx.location?.trim()
        ? escapeHtml(ctx.location)
        : `<span style="color:${BRAND.muted};font-weight:700;">—</span>`
    )}

    ${divider()}
    ${sectionTitle('Nachricht')}
    ${
      ctx.message?.trim()
        ? messageBox(nl2br(ctx.message))
        : messageBox(`<span style="color:${BRAND.muted};font-weight:700;">— (keine Nachricht angegeben)</span>`)
    }

    ${divider()}
    ${p(
      `Hinweis: Setzen Sie beim Senden der internen Mail am besten <b>Reply-To</b> auf die Kunden-E-Mail ` +
        `(falls vorhanden) – sonst Rückruf über Telefon.`
    )}
  `

  return baseWrap(
    `Neue Anfrage von ${ctx.firstName} ${ctx.lastName}`,
    getRuempelTurboInternalSubject(ctx),
    rows,
    ctx.siteUrl
  )
}

export const RUEMPELTURBO_SUPPORT_EMAIL = BRAND.supportEmail
