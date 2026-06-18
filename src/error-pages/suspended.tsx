import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function SuspendedPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Account suspended</h1>
      <p className="text-muted-foreground">
        Your account has been suspended. Please contact support for assistance.
      </p>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
