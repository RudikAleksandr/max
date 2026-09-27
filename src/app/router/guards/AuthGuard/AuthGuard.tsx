import {
  Navigate,
  Outlet
} from 'react-router'

import { useIsLoggedIn } from '@/modules/auth'
import { ROUTES } from '@/shared/config'

export function AuthGuard() {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.AUTH} replace />
  }

  return <Outlet />
}
