import { ScanEye } from 'lucide-react'
import { cn } from '@/lib/utils'

type BrandMarkProps = {
  /** Show the "Tabayun" wordmark next to the glyph. */
  showWordmark?: boolean
  /** Optional tagline rendered under the wordmark. */
  tagline?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const GLYPH_SIZE = {
  sm: 'size-8 rounded-lg [&>svg]:size-4',
  md: 'size-10 rounded-xl [&>svg]:size-5',
  lg: 'size-14 rounded-2xl [&>svg]:size-7',
} as const

const WORDMARK_SIZE = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
} as const

/**
 * Tabayun brand lockup: a Signal Violet glyph (an eye-in-scan, for "see what's
 * real") plus the wordmark. The one place the primary accent is allowed to sit
 * purely for identity. Reused in the app shell, auth, error pages, and loader.
 */
export function BrandMark({
  showWordmark = true,
  tagline,
  size = 'md',
  className,
}: BrandMarkProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center bg-primary text-primary-foreground shadow-sm',
          GLYPH_SIZE[size],
        )}
      >
        <ScanEye strokeWidth={2.25} />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-semibold tracking-tight text-foreground',
              WORDMARK_SIZE[size],
            )}
          >
            Tabayun
          </span>
          {tagline && (
            <span className="mt-1 text-xs font-medium text-muted-foreground">
              {tagline}
            </span>
          )}
        </span>
      )}
    </div>
  )
}
