import {
  lazy,
  Suspense
} from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router'

import {
  AuthGuard,
  GuestGuard
} from '@/app/router/guards'
import { ROUTES } from '@/shared/config'

const ChatPage = lazy(() => import('@/pages/ChatPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route
              path={ROUTES.CHAT}
              element={<ChatPage />}
            />
          </Route>
          <Route element={<GuestGuard />}>
            <Route
              path={ROUTES.AUTH}
              element={<LoginPage />}
            />
          </Route>
          <Route
            path="*"
            element={(
              <Navigate
                to={ROUTES.HOME}
                replace
              />
            )}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
