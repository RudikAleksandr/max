import {
  Navigate,
  Outlet
} from 'react-router'

import { useIsLoggedIn } from '@/modules/auth'
import { ROUTES } from '@/shared/config'

export function GuestGuard() {
  const isLoggedIn = useIsLoggedIn()

  if (isLoggedIn) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}
