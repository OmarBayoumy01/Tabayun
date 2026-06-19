import { useRef, useState } from 'react'
import { FileVideo, ImageIcon, UploadCloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { MediaType } from '../types'

const ACCEPT = 'image/*,video/*'

export type MediaPreview = {
  url: string
  mediaKind: MediaType
  fileName: string
  fileSize: number
}

type MediaDropzoneProps = {
  preview: MediaPreview | null
  onSelect: (file: File) => void
  onClear: () => void
  disabled?: boolean
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }
  return `${value.toFixed(1)} ${units[unit]}`
}

export function MediaDropzone({
  preview,
  onSelect,
  onClear,
  disabled,
}: MediaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (files: FileList | null) => {
    const next = files?.[0]
    if (next) onSelect(next)
  }

  if (preview) {
    const isVideo = preview.mediaKind === 'video'
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/5">
          {isVideo ? (
            <video
              src={preview.url}
              controls
              className="absolute inset-0 h-full w-full bg-black object-contain"
            />
          ) : (
            <img
              src={preview.url}
              alt={preview.fileName}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="absolute right-2 top-2"
            onClick={onClear}
            disabled={disabled}
            aria-label="Remove file"
          >
            <X />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isVideo ? (
            <FileVideo className="size-4 shrink-0" />
          ) : (
            <ImageIcon className="size-4 shrink-0" />
          )}
          <span className="truncate font-medium text-foreground">
            {preview.fileName}
          </span>
          <span className="ml-auto shrink-0">
            {formatBytes(preview.fileSize)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={cn(
        'group flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors',
        'hover:border-primary/50 hover:bg-primary/[0.03]',
        'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30',
        isDragging && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
        <UploadCloud className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">
          Drop a photo or video, or{' '}
          <span className="text-primary">click to browse</span>
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, PNG, WEBP, MP4, MOV or WEBM
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </button>
  )
}
