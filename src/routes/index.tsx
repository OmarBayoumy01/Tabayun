import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { lazyPage } from '@/routes/lazy-page'
import AppWrapper from '@/providers/router-provider'
import { authRoute } from '@/modules/auth/routes'
import { appRoute } from '@/modules/app/routes'

const SuspendedPage = lazyPage(
  () => import('@/error-pages/suspended'),
  'SuspendedPage',
)
const Error403Page = lazyPage(() => import('@/error-pages/403'), 'Error403Page')
const Error404Page = lazyPage(() => import('@/error-pages/404'), 'Error404Page')

// Compose the route tree from each feature module. Modules own their own
// routes; this file only assembles them and the top-level error pages.
export function createAppRoutes(): RouteObject[] {
  return [
    authRoute,
    {
      path: '/',
      element: <AppWrapper />,
      children: [appRoute],
    },
    { path: '/suspended', element: <SuspendedPage /> },
    { path: '/403', element: <Error403Page /> },
    { path: '*', element: <Error404Page /> },
  ]
}

export const router = createBrowserRouter(createAppRoutes())
