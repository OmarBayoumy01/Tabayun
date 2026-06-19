import { useState } from 'react'
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotify } from '@/hooks/notify'
import { useSubmitFeedback } from '../apis/queries'

// Admin-only control for POST /feedback. Records whether a detection's verdict
// was correct. Rendered only for admin sessions.
export function FeedbackControl({ detectionId }: { detectionId: string }) {
  const [done, setDone] = useState(false)
  const { notify } = useNotify()
  const feedback = useSubmitFeedback()

  const submit = (isCorrect: boolean) => {
    feedback.mutate(
      {
        detection_id: detectionId,
        is_correct: isCorrect,
        note: null,
      },
      {
        onSuccess: () => {
          setDone(true)
          notify.success('Feedback recorded')
        },
      },
    )
  }

  if (done) {
    return (
      <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        <Check className="size-4 text-success" />
        Thanks — your feedback was recorded.
      </p>
    )
  }

  return (
    <div className="w-full space-y-3">
      <p className="text-sm font-medium">Was this verdict correct?</p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => submit(true)}
          disabled={feedback.isPending}
        >
          <ThumbsUp />
          Correct
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => submit(false)}
          disabled={feedback.isPending}
        >
          <ThumbsDown />
          Incorrect
        </Button>
      </div>
    </div>
  )
}
