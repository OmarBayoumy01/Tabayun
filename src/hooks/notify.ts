import { useMemo } from 'react'
import { toast } from 'sonner'

// Thin wrapper over the toast system so callers depend on this hook,
// not the toast library directly. Memoized so the returned object is stable.
export function useNotify() {
  return useMemo(
    () => ({
      notify: {
        error: (message: string) => toast.error(message),
        success: (message: string) => toast.success(message),
        info: (message: string) => toast(message),
      },
    }),
    [],
  )
}
