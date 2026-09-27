import { useCredentialsStore } from '@/modules/auth/model'
import { Button } from '@/shared/ui'

export function LogoutButton() {
  const logout = useCredentialsStore((state) => state.logout)

  return (
    <Button
      variant="ghost"
      size="xsmall"
      onClick={logout}
    >
      Выйти
    </Button>
  )
}
