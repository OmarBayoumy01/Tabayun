import { Outlet, useNavigate } from 'react-router-dom'
import { useAtomValue, useSetAtom } from 'jotai'
import { clearToken } from '@/lib/auth'
import { queryClient } from '@/lib/queryClient'
import { userDataAtom } from '@/modules/auth/store'
import { userQueryKey } from '@/modules/auth/apis/queries'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/brand-mark'
import { ModeToggle } from '@/components/mode-toggle'
import { useNotify } from '@/hooks/notify'

// Shared chrome for authenticated app pages.
export default function AppLayout() {
  const navigate = useNavigate()
  const user = useAtomValue(userDataAtom)
  const setUserData = useSetAtom(userDataAtom)
  const { notify } = useNotify()

  const handleSignOut = () => {
    clearToken()
    setUserData(null)
    queryClient.invalidateQueries({ queryKey: userQueryKey })
    navigate('/auth/login', { replace: true })
    notify.success('Signed out successfully')
  }

  const initial = user?.name?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <BrandMark size="sm" />
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />
            {user && (
              <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {initial}
                </span>
                <span className="hidden max-w-[10rem] truncate text-sm font-medium sm:block">
                  {user.name}
                </span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-5">
        <Outlet />
      </main>
    </div>
  )
}
