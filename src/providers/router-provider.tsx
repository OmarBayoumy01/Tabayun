import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import globalHooks from '@/services/global-router'
import { useHealth } from '@/modules/app/apis/queries'
import { useNotify } from '@/hooks/notify'
import { PageLoader } from '@/components/page-loader'
import { useSetAtom } from 'jotai'
import { userDataAtom } from '@/modules/auth/store'
import { useGetUser } from '@/modules/auth/apis/queries'

// App shell gate. Waits for the backend health check (GET /health) and the user
// fetch before rendering: a full-screen loader while they resolve, then it
// hydrates `userDataAtom` on success or redirects to login on failure
// (backend unreachable, or a missing/expired token).
const AppWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { notify } = useNotify()
  const setUserData = useSetAtom(userDataAtom)

  const { isLoading: healthLoading, isError: healthError } = useHealth()
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUser()

  const isLoading = healthLoading || userLoading
  const isError = healthError || userError

  // Keep the global bridge pointed at the live router + notifier so non-React
  // code (axios interceptors) can navigate and toast.
  useEffect(() => {
    globalHooks.globalRouter.navigate = navigate
    globalHooks.globalRouter.location = location
    globalHooks.globalNotify = notify.error
  }, [navigate, location, notify])

  // Hydrate the global user atom once the fetch resolves.
  useEffect(() => {
    if (user) setUserData(user)
  }, [user, setUserData])

  // Unauthenticated — bounce to login instead of rendering the app shell.
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
