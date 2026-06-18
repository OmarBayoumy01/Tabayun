import { Outlet, useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { clearToken } from '@/lib/auth'
import { queryClient } from '@/lib/queryClient'
import { userDataAtom } from '@/modules/auth/store'
import { userQueryKey } from '@/modules/auth/apis/queries'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { useNotify } from '@/hooks/notify'

// Shared chrome for authenticated app pages.
export default function AppLayout() {
  const navigate = useNavigate()
  const setUserData = useSetAtom(userDataAtom)
  const { notify } = useNotify()

  const handleSignOut = () => {
    clearToken()
    setUserData(null)
    queryClient.invalidateQueries({ queryKey: userQueryKey })
    // queryClient.removeQueries({ queryKey: userQueryKey })
    navigate('/auth/login', { replace: true })
    notify.success('Nice')
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <span className="text-lg font-semibold">LAMS</span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
