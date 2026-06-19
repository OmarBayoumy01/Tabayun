import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/brand-mark'

export function Error404Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <BrandMark size="sm" />
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <SearchX className="size-8" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="max-w-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have moved.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
