import { useQuery } from '@tanstack/react-query'
import { getToken } from '@/lib/auth'
import type { User } from '../types'

export const userQueryKey = ['auth', 'me'] as const

// Mock "who am I?" against the stored token. With no token it rejects, which
// AppWrapper treats as unauthenticated. Swap this for api.get('/auth/me')
// once a real backend exists.
async function getUser(): Promise<User> {
  const token = getToken()
  if (!token) throw new Error('Unauthenticated')

  const email = token.startsWith('demo-token:')
    ? token.slice('demo-token:'.length)
    : 'user@example.com'

  return { id: 1, name: email.split('@')[0], email }
}

export function useGetUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: getUser,
    retry: false,
  })
}
