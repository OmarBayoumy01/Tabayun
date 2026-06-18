import { atom } from 'jotai'
import type { User } from './types'

// The authenticated user, hydrated by AppWrapper after a successful fetch.
// Read it anywhere with useAtomValue(userDataAtom).
export const userDataAtom = atom<User | null>(null)
