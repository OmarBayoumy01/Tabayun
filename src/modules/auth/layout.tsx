import { Outlet } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-svh items-center justify-center bg-background p-6">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <Outlet />
    </main>
  )
}
