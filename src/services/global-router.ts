import type { Location, NavigateFunction } from 'react-router-dom'

// Bridges React Router navigation + notifications into module-scope so that
// non-React code (e.g. axios interceptors) can navigate and surface errors.
// AppWrapper assigns these on every render so they stay current.
interface GlobalRouter {
  navigate: NavigateFunction | null
  location: Location | null
}

const globalHooks: {
  globalRouter: GlobalRouter
  globalNotify: ((message: string) => void) | null
} = {
  globalRouter: { navigate: null, location: null },
  globalNotify: null,
}

export default globalHooks
