import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import globalHooks from '@/services/global-router'
import { useHealth } from '@/modules/app/apis/queries'
import { useNotify } from '@/hooks/notify'
import { PageLoader } from '@/components/page-loader'
import { useSetAtom } from 'jotai'
import { userDataAtom } from '@/modules/auth/store'

// App shell gate. Waits for the backend health check (GET /health) before
// rendering the app: a full-screen loader while it resolves, and a redirect to
// login if the backend is unreachable.
const AppWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { notify } = useNotify()
  const setUserData = useSetAtom(userDataAtom)

  const { isLoading, isError } = useHealth()

  // Keep the global bridge pointed at the live router + notifier so non-React
  // code (axios interceptors) can navigate and toast.
  useEffect(() => {
    globalHooks.globalRouter.navigate = navigate
    globalHooks.globalRouter.location = location
    globalHooks.globalNotify = notify.error
  }, [navigate, location, notify])

  // Backend unreachable — bounce to login instead of rendering the app shell.
  useEffect(() => {
    if (isError && !location.pathname.includes('/auth')) {
      setUserData(null)
      navigate('/auth/login', { replace: true })
    }
  }, [isError, navigate])

  if (isLoading || isError) return <PageLoader fullScreen />

  return <Outlet />
}

export default AppWrapper
