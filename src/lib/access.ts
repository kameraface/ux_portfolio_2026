// Static hosting means this gate runs in the browser: it deters casual visitors but is not real security.
const STORAGE_KEY = 'ku-case-studies-unlocked'
const CONTACT_EMAIL = 'karl@karluschold.com'

async function sha256Hex(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

export function isUnlocked() {
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

export async function verifyPassword(password: string) {
  const expected = import.meta.env.VITE_CASE_STUDY_PASSWORD_HASH?.trim().toLowerCase()
  if (!expected) return false
  const ok = (await sha256Hex(password.trim())) === expected
  if (ok) sessionStorage.setItem(STORAGE_KEY, 'true')
  return ok
}

export interface AccessRequest {
  name: string
  email: string
  message: string
  caseStudy: string
}

export type AccessRequestResult = 'sent' | 'mailto'

export async function requestAccess(request: AccessRequest): Promise<AccessRequestResult> {
  const endpoint = import.meta.env.VITE_ACCESS_REQUEST_ENDPOINT
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
    return 'sent'
  }

  const subject = `Case study access request: ${request.caseStudy}`
  const body = [`Name: ${request.name}`, `Email: ${request.email}`, '', request.message].join('\n')
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return 'mailto'
}
