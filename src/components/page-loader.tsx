import { ScanEye } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageLoader({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen ? 'min-h-svh bg-background' : 'p-8',
      )}
    >
      <div className="relative flex size-14 items-center justify-center">
        {/* Brand glyph at rest, with an orbiting ring to signal progress. */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl border-2 border-primary/15 border-t-primary motion-safe:animate-spin"
        />
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ScanEye className="size-5" strokeWidth={2.25} />
        </span>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
