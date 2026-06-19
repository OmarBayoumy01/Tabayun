import { Outlet } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background p-6">
      {/* Calm brand wash — a soft violet glow, not glassmorphism or neon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-80 max-w-2xl rounded-full bg-primary/10 blur-3xl"
      />
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <Outlet />
    </main>
  )
}
