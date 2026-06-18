import { Navigate, type RouteObject } from 'react-router-dom'
import { lazyPage } from '@/routes/lazy-page'
import AuthLayout from './layout'

const LoginController = lazyPage(() => import('./pages'), 'LoginController')

export const authRoute: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="/auth/login" replace /> },
    { path: 'login', element: <LoginController /> },
  ],
}
