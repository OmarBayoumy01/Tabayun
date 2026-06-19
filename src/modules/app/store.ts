import { atom } from 'jotai'
import type { ScanRecord } from './types'

// The result currently shown in the detector's result panel — either the latest
// analysis or a scan picked from history. Null shows the empty state.
export const selectedResultAtom = atom<ScanRecord | null>(null)

// Session-local scan history. The backend has no history endpoint, so each
// successful detection is appended here (most recent first) for the session.
export const scanHistoryAtom = atom<ScanRecord[]>([])
