import {
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type {
  DetectionMethod,
  DetectionResult,
  DetectionVerdict,
} from '../types'

type VerdictMeta = {
  label: string
  Icon: LucideIcon
  /** Tinted chip styles (color + 10% background). */
  chip: string
  /** Disc styles for the large result icon. */
  disc: string
  headline: string
  detail?: string
}

const VERDICT_META: Record<DetectionVerdict, VerdictMeta> = {
  Real: {
    label: 'Authentic',
    Icon: ShieldCheck,
    chip: 'bg-success/10 text-success',
    disc: 'bg-success/10 text-success',
    headline: 'Looks authentic',
  },
  Fake: {
    label: 'AI · Fake',
    Icon: ShieldAlert,
    chip: 'bg-destructive/10 text-destructive',
    disc: 'bg-destructive/10 text-destructive',
    headline: 'Likely AI-generated',
    detail: 'This media appears to be AI-generated or manipulated.',
  },
}

// Plain-language note for how the two primary models were reconciled.
const METHOD_LABEL: Record<DetectionMethod, string> = {
  consensus: 'Both models agreed',
  tiebreaker: 'Resolved by the reference model',
  confidence_fallback: 'Resolved by model confidence',
  confidence_tiebreak: 'Resolved by model confidence',
}

function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}% confidence`
}

// Verdict pill: color + icon + text, so it reads without relying on color alone.
export function VerdictBadge({ verdict }: { verdict: DetectionVerdict }) {
  const { label, Icon, chip } = VERDICT_META[verdict]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        chip,
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  )
}

export function ResultEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <ScanSearch className="size-7" />
      </div>
      <p className="max-w-xs text-sm text-muted-foreground">
        Upload a photo or video and run an analysis to see whether it's
        authentic here.
      </p>
    </div>
  )
}

export function ResultSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Skeleton className="size-16 rounded-2xl" />
      <Skeleton className="h-7 w-40 rounded-full" />
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-4 w-44" />
    </div>
  )
}

// One model's individual call — its own verdict, confidence and raw detail.
function ModelRow({
  label,
  verdict,
  confidence,
  detail,
}: DetectionResult['models'][number]) {
  const { Icon, chip } = VERDICT_META[verdict]
  return (
    <li className="flex items-start gap-3 text-left">
      <span
        className={cn(
          'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
          chip,
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium">{label}</span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatConfidence(confidence)}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground" title={detail}>
          {detail}
        </p>
      </div>
    </li>
  )
}

export function AnalysisResultView({ result }: { result: DetectionResult }) {
  const meta = VERDICT_META[result.verdict]
  const { Icon } = meta

  return (
    <div
      className="flex w-full flex-col items-center gap-5 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          'flex size-16 items-center justify-center rounded-2xl',
          meta.disc,
        )}
      >
        <Icon className="size-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {meta.headline}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <VerdictBadge verdict={result.verdict} />
          <span className="text-sm font-medium text-muted-foreground">
            {formatConfidence(result.confidence)}
          </span>
        </div>
      </div>
      <p className="max-w-xs text-sm text-muted-foreground">{meta.detail}</p>
    </div>
  )
}
