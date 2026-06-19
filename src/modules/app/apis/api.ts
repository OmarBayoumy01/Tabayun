import { api } from '@/lib/axios'
import type {
  DetectionResult,
  FeedbackRequest,
  FeedbackResponse,
  HealthResponse,
} from '../types'

// GET /health — liveness probe, no auth required.
export async function getHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>('/health')
  return data
}

// Build a multipart body for the detect endpoints. The explicit Content-Type
// lets axios fill in the boundary itself (the instance otherwise defaults to
// application/json, which would break the upload).
function buildMediaForm(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return {
    body: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  }
}

// POST /detect/image — multipart upload of a single image. Requires a valid
// Bearer token (admin or client). Returns the combined verdict plus each
// model's individual call and how the verdict was reached.
export async function detectImage(file: File): Promise<DetectionResult> {
  const { body, config } = buildMediaForm(file)
  const { data } = await api.post<DetectionResult>('/detect/image', body, config)
  return data
}

// POST /detect/video — same contract as /detect/image, for video files
// (backend rejects clips longer than 2 minutes). Requires a valid Bearer token.
export async function detectVideo(file: File): Promise<DetectionResult> {
  const { body, config } = buildMediaForm(file)
  const { data } = await api.post<DetectionResult>('/detect/video', body, config)
  return data
}

// POST /feedback — admin only. Records whether a prior detection was correct;
// a client token gets 403, an unknown detection_id gets 404.
export async function submitFeedback(
  payload: FeedbackRequest,
): Promise<FeedbackResponse> {
  const { data } = await api.post<FeedbackResponse>('/feedback', payload)
  return data
}
