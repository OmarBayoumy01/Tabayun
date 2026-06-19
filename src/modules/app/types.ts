// Types for the AI / fake-media detector feature. These mirror the shapes the
// backend returns (POST /detect/image, /detect/video, /feedback) so the UI can
// stay unchanged when the real endpoints are live.

export type MediaType = 'image' | 'video'

// The backend's verdict vocabulary.
export type DetectionVerdict = 'Fake' | 'Real'

// How the final verdict was reached when the two primary models are combined.
//   consensus           — both models agreed
//   tiebreaker          — models disagreed, Hive reference model broke the tie
//   confidence_fallback — models disagreed, Hive unavailable, higher confidence won
//   confidence_tiebreak — video disagreement resolved by confidence (no Hive)
export type DetectionMethod =
  | 'consensus'
  | 'tiebreaker'
  | 'confidence_fallback'
  | 'confidence_tiebreak'

// One model's individual call within a detection.
export interface ModelResult {
  label: string
  verdict: DetectionVerdict
  confidence: number
  detail: string
}

// POST /detect/image and /detect/video success response.
export interface DetectionResult {
  detection_id: string
  verdict: DetectionVerdict
  confidence: number
  media_type: MediaType
  filename: string
  models: ModelResult[]
  method: DetectionMethod
}

// A detection plus the client-side bits the backend doesn't return, so a scan
// can be re-previewed and listed in history (which is session-local — there is
// no history endpoint).
export interface ScanRecord extends DetectionResult {
  previewUrl: string
  fileSize: number
  createdAt: string
}

// POST /feedback request body (admin only). `detection_id` comes from a prior
// /detect response; `note` is free text or null.
export interface FeedbackRequest {
  detection_id: string
  is_correct: boolean
  note: string | null
}

// POST /feedback success response.
export interface FeedbackResponse {
  success: boolean
  detection_id: string
}

// GET /health response.
export interface HealthResponse {
  status: string
}
