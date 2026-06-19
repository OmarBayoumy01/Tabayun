import { useMutation, useQuery } from '@tanstack/react-query'
import { detectImage, detectVideo, getHealth, submitFeedback } from './api'

export const healthQueryKey = ['health'] as const

export function useHealth() {
  return useQuery({
    queryKey: healthQueryKey,
    queryFn: getHealth,
  })
}

export function useDetectImage() {
  return useMutation({
    mutationFn: detectImage,
  })
}

export function useDetectVideo() {
  return useMutation({
    mutationFn: detectVideo,
  })
}

export function useSubmitFeedback() {
  return useMutation({
    mutationFn: submitFeedback,
  })
}
