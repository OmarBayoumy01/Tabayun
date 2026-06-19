import { useEffect, useMemo, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Loader2, ScanSearch } from 'lucide-react'
import { useNotify } from '@/hooks/notify'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { userDataAtom } from '@/modules/auth/store'
import { useDetectImage, useDetectVideo } from '../apis/queries'
import { scanHistoryAtom, selectedResultAtom } from '../store'
import { MediaDropzone, type MediaPreview } from '../components/media-dropzone'
import {
  AnalysisResultView,
  ResultEmptyState,
  ResultSkeleton,
} from '../components/analysis-result'
import { FeedbackControl } from '../components/feedback-control'
import { ScanHistory } from '../components/scan-history'
import type { DetectionResult, ScanRecord } from '../types'

export function DashboardController() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedResult, setSelectedResult] = useAtom(selectedResultAtom)
  const setHistory = useSetAtom(scanHistoryAtom)
  const user = useAtomValue(userDataAtom)
  const { notify } = useNotify()

  const detectImage = useDetectImage()
  const detectVideo = useDetectVideo()
  const isPending = detectImage.isPending || detectVideo.isPending

  // Object URL for a freshly-picked file; revoked when the file changes/unmounts.
  const fileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  )
  useEffect(() => {
    if (!fileUrl) return
    return () => URL.revokeObjectURL(fileUrl)
  }, [fileUrl])

  // Show the picked file if there is one, otherwise the selected history scan.
  const preview: MediaPreview | null =
    file && fileUrl
      ? {
          url: fileUrl,
          mediaKind: file.type.startsWith('video') ? 'video' : 'image',
          fileName: file.name,
          fileSize: file.size,
        }
      : selectedResult
        ? {
            url: selectedResult.previewUrl,
            mediaKind: selectedResult.media_type,
            fileName: selectedResult.filename,
            fileSize: selectedResult.fileSize,
          }
        : null

  const handleAnalyze = () => {
    if (!file) return
    const isVideo = file.type.startsWith('video')
    const detector = isVideo ? detectVideo : detectImage
    detector.mutate(file, {
      onSuccess: (result: DetectionResult) => {
        // The backend doesn't return the file's preview/size, so wrap the
        // detection with a persistent object URL for re-previewing from history.
        const record: ScanRecord = {
          ...result,
          previewUrl: URL.createObjectURL(file),
          fileSize: file.size,
          createdAt: new Date().toISOString(),
        }
        setSelectedResult(record)
        setHistory((prev) => [record, ...prev])
        notify.success('Analysis complete')
      },
      // Errors surface via the axios interceptor's toast.
    })
  }

  const handleSelect = (next: File) => {
    setFile(next)
    setSelectedResult(null)
  }

  const handleClear = () => {
    setFile(null)
    setSelectedResult(null)
  }

  // Re-preview a past scan and show its stored result, dropping any picked file.
  const handleSelectScan = (scan: ScanRecord) => {
    setFile(null)
    setSelectedResult(scan)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Is this real?
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Upload a photo or video and Tabayun will tell you whether it's
          authentic or AI-generated — privately, in seconds.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Upload media</CardTitle>
            <CardDescription>
              We never store your files — they're analysed and discarded.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[20rem] flex-1 flex-col gap-4">
            <MediaDropzone
              preview={preview}
              onSelect={handleSelect}
              onClear={handleClear}
              disabled={isPending}
            />
            <Button
              size="lg"
              className="w-full"
              disabled={!file || isPending}
              onClick={handleAnalyze}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analysing…
                </>
              ) : (
                <>
                  <ScanSearch />
                  Analyze
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn(
            'flex flex-col transition-shadow',
            selectedResult &&
              (selectedResult.verdict === 'Fake'
                ? 'ring-1 ring-destructive/30'
                : 'ring-1 ring-success/30'),
          )}
        >
          <CardHeader>
            <CardTitle>Detection result</CardTitle>
            <CardDescription>
              Whether the media is AI-generated or authentic.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[20rem] flex-1 flex-col items-center justify-center gap-6">
            {isPending ? (
              <ResultSkeleton />
            ) : selectedResult ? (
              <>
                <AnalysisResultView result={selectedResult} />
                {user?.role === 'admin' && (
                  <FeedbackControl
                    key={selectedResult.detection_id}
                    detectionId={selectedResult.detection_id}
                  />
                )}
              </>
            ) : (
              <ResultEmptyState />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scan history</CardTitle>
          <CardDescription>
            Previously analysed files — click one to view its report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScanHistory
            onSelect={handleSelectScan}
            selectedId={selectedResult?.detection_id}
          />
        </CardContent>
      </Card>
    </div>
  )
}
