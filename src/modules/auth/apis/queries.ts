import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser, login } from './api'

export const userQueryKey = ['auth', 'me'] as const

export function useGetUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: getUser,
    retry: false,
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  })
}
