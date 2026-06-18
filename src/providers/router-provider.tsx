import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import globalHooks from '@/services/global-router'
import { userDataAtom } from '@/modules/auth/store'
import { useGetUser } from '@/modules/auth/apis/queries'
import { useNotify } from '@/hooks/notify'
import { PageLoader } from '@/components/page-loader'

// Auth gate for the app shell. Validates the session by fetching the user
// (the token rides along via the axios instance). Until that resolves we show
// a full-screen loader; unauthenticated users are redirected to login.
const AppWrapper = () => {
  const setUserData = useSetAtom(userDataAtom)

  const location = useLocation()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const { data, isLoading, isError } = useGetUser()

  // Keep the global bridge pointed at the live router + notifier so non-React
  // code (axios interceptors) can navigate and toast.
  useEffect(() => {
    globalHooks.globalRouter.navigate = navigate
    globalHooks.globalRouter.location = location
    globalHooks.globalNotify = notify.error
  }, [navigate, location, notify])

  // Sync auth result: hydrate the user, or bounce unauthenticated visitors.
  useEffect(() => {
    if (isLoading) return
    if (isError || !data) {
      if (!location.pathname.includes('/auth')) {
        navigate('/auth/login', { replace: true })
      }
    } else {
      setUserData(data)
    }
  }, [isError, isLoading, data, navigate])

  if (isLoading || isError || !data) return <PageLoader fullScreen />

  return <Outlet />
}

export default AppWrapper
