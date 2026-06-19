import { useAtomValue } from 'jotai'
import { Play, ShieldAlert, ShieldCheck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scanHistoryAtom } from '../store'
import type { DetectionVerdict, ScanRecord } from '../types'

type ScanHistoryProps = {
  onSelect: (scan: ScanRecord) => void
  /** detection_id of the scan currently shown in the result panel, if any. */
  selectedId?: string
}

const VERDICT: Record<
  DetectionVerdict,
  { label: string; Icon: LucideIcon; dot: string }
> = {
  Real: { label: 'Authentic', Icon: ShieldCheck, dot: 'bg-success' },
  Fake: { label: 'AI · Fake', Icon: ShieldAlert, dot: 'bg-destructive' },
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

function HistoryCard({
  scan,
  onSelect,
  isSelected,
}: {
  scan: ScanRecord
  onSelect: (scan: ScanRecord) => void
  isSelected: boolean
}) {
  const isVideo = scan.media_type === 'video'
  const verdict = VERDICT[scan.verdict]
  const time = formatRelativeTime(scan.createdAt)

  return (
    <button
      type="button"
      onClick={() => onSelect(scan)}
      title={scan.filename}
      aria-label={`${scan.filename} — ${verdict.label}, ${time}`}
      aria-pressed={isSelected}
      className={cn(
        'group/scan relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-2xl border bg-muted text-left transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isSelected
          ? 'border-primary ring-2 ring-primary/40'
          : 'border-border hover:border-foreground/15',
      )}
    >
      {isVideo ? (
        <video
          src={scan.previewUrl}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/scan:scale-105"
        />
      ) : (
        <img
          src={scan.previewUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/scan:scale-105"
        />
      )}

      {/* Smooth bottom-up scrim so overlaid text stays legible over any media. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      {/* Video affordance, top-left. */}
      {isVideo && (
        <span className="absolute left-2 top-2 flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
          <Play className="size-3 fill-current" />
        </span>
      )}

      {/* Selected pip, top-right. */}
      {isSelected && (
        <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
          Viewing
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-3">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              'flex size-5 items-center justify-center rounded-full text-white shadow-sm',
              verdict.dot,
            )}
          >
            <verdict.Icon className="size-3" />
          </span>
          <span className="text-xs font-semibold text-white">
            {verdict.label}
          </span>
        </span>
        <p className="truncate text-sm font-medium text-white">
          {scan.filename}
        </p>
        <p className="text-xs text-white/70">{time}</p>
      </div>
    </button>
  )
}

export function ScanHistory({ onSelect, selectedId }: ScanHistoryProps) {
  const history = useAtomValue(scanHistoryAtom)

  if (history.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No scans yet. Your analysed files will appear here.
      </p>
    )
  }

  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
      {history.map((scan) => (
        <HistoryCard
          key={scan.detection_id}
          scan={scan}
          onSelect={onSelect}
          isSelected={scan.detection_id === selectedId}
        />
      ))}
    </div>
  )
}
