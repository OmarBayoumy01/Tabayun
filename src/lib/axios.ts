import axios from 'axios'
import { getToken } from '@/lib/auth'
import globalHooks from '@/services/global-router'

// Centralized axios instance. Configure the base URL via VITE_API_URL in .env.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the auth token to every request.
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Central error handling — redirect on 401, toast otherwise — via the global
// router bridge so this works outside of React components.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      globalHooks.globalRouter.navigate?.('/auth/login')
    }
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Something went wrong'
    globalHooks.globalNotify?.(message)
    return Promise.reject(error)
  },
)

export default api
