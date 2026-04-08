import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthGuard } from './guards/AuthGuard'
import { DashboardLayout } from '../components/templates/DashboardLayout'
import { FullscreenLoader } from '../components/templates/FullscreenLoader'

const DashboardPage = lazy(() => import('../pages/Dashboard'))
const SpasPage      = lazy(() => import('../pages/Spas'))
const UsersPage     = lazy(() => import('../pages/Users'))
const AuditPage     = lazy(() => import('../pages/Audit'))
const SettingsPage  = lazy(() => import('../pages/Settings'))
const ReportsPage   = lazy(() => import('../pages/Reports'))
const BillingPage   = lazy(() => import('../pages/Billing'))
const NotFoundPage  = lazy(() => import('../pages/NotFound'))

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<FullscreenLoader />}><DashboardPage /></Suspense>,
          },
          {
            path: 'spas',
            element: <Suspense fallback={<FullscreenLoader />}><SpasPage /></Suspense>,
          },
          {
            path: 'users',
            element: <Suspense fallback={<FullscreenLoader />}><UsersPage /></Suspense>,
          },
          {
            path: 'audit',
            element: <Suspense fallback={<FullscreenLoader />}><AuditPage /></Suspense>,
          },
          {
            path: 'settings',
            element: <Suspense fallback={<FullscreenLoader />}><SettingsPage /></Suspense>,
          },
          {
            path: 'reports',
            element: <Suspense fallback={<FullscreenLoader />}><ReportsPage /></Suspense>,
          },
          {
            path: 'billing',
            element: <Suspense fallback={<FullscreenLoader />}><BillingPage /></Suspense>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Suspense fallback={<FullscreenLoader />}><NotFoundPage /></Suspense>,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}