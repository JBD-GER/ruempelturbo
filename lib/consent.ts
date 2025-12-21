// src/lib/consent.ts
export type Consent = {
  analytics: boolean
  marketing: boolean
  ts: number
  v: number
}

const KEY = 'rt_consent_v1'
const VERSION = 1

function safeJsonParse<T>(s: string | null): T | null {
  if (!s) return null
  try {
    return JSON.parse(s) as T
  } catch {
    return null
  }
}

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(KEY)
  const data = safeJsonParse<Consent>(raw)
  if (!data) return null
  if (typeof data.analytics !== 'boolean') return null
  if (typeof data.marketing !== 'boolean') return null
  if (data.v !== VERSION) return null
  return data
}

export function writeConsent(input: { analytics: boolean; marketing: boolean }) {
  if (typeof window === 'undefined') return

  const data: Consent = {
    analytics: !!input.analytics,
    marketing: !!input.marketing,
    ts: Date.now(),
    v: VERSION,
  }

  window.localStorage.setItem(KEY, JSON.stringify(data))

  // Optional: Mini-Cookie als "Marker" (z.B. für Server/Edge Checks)
  // Enthält KEINE Details, nur "gesetzt"
  document.cookie = `rt_consent=1; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

export function clearConsent() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
  document.cookie = `rt_consent=; Path=/; Max-Age=0; SameSite=Lax`
}
