// Roles encoded in the JWT's `role` claim. Admins additionally get /feedback.
export type UserRole = 'admin' | 'client'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

// POST /auth/login request body.
export interface LoginRequest {
  email: string
  password: string
}

// POST /auth/login success response. `access_token` is a signed JWT (HS256)
// that must be sent as `Authorization: Bearer <token>` on protected endpoints.
export interface LoginResponse {
  access_token: string
  token_type: string
  role: UserRole
}
