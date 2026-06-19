import { api } from '@/lib/axios'
import { getToken } from '@/lib/auth'
import type { LoginRequest, LoginResponse, User, UserRole } from '../types'

// POST /auth/login — exchange credentials for a signed JWT plus the user's role.
// The axios instance attaches the stored token as a Bearer header on every
// subsequent request, so callers only need to persist `access_token`.
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)
  return data
}

type JwtClaims = { sub?: string; role?: UserRole; exp?: number }

// Decode (not verify) a JWT payload. Signature verification happens server-side;
// here we only read the claims to know who the stored token belongs to.
function decodeJwtPayload(token: string): JwtClaims | null {
  try {
    const segment = token.split('.')[1]
    if (!segment) return null
    const json = atob(segment.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as JwtClaims
  } catch {
    return null
  }
}

// There is no /auth/me endpoint — the JWT itself carries the user's identity
// (email in `sub`, role in `role`). The auth gate calls this to validate the
// stored session: a missing, malformed, or expired token throws, which
// AppWrapper treats as unauthenticated.
export async function getUser(): Promise<User> {
  const token = getToken()
  if (!token) throw new Error('Unauthenticated')

  const claims = decodeJwtPayload(token)
  if (!claims?.sub) throw new Error('Invalid or expired token')
  if (claims.exp && claims.exp * 1000 <= Date.now()) {
    throw new Error('Invalid or expired token')
  }

  return {
    id: 1,
    name: claims.sub.split('@')[0],
    email: claims.sub,
    role: claims.role ?? 'client',
  }
}
