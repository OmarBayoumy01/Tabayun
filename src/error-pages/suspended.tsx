import { Link } from 'react-router-dom'
import { PauseCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/brand-mark'

export function SuspendedPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <BrandMark size="sm" />
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <PauseCircle className="size-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Account suspended
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Your account has been suspended. Please contact support and we'll help
          you sort it out.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
