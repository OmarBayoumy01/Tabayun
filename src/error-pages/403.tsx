import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/brand-mark'

export function Error403Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <BrandMark size="sm" />
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Lock className="size-8" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">403</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Access denied
        </h1>
        <p className="max-w-sm text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
