import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTranslation } from '../i18n'
import { useAuth } from '../store/AuthContext'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/Button'

interface HeaderProps {
  className?: string
}

export function Header({ className = '' }: HeaderProps) {
  const { user, logout } = useAuth()
  const t = useTranslation()
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className={`header-glass sticky top-0 z-40 ${className}`}>
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2.5">
          {user && (
            <span className="hidden max-w-52 truncate text-sm text-muted sm:block" title={user.email}>
              {user.email}
            </span>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            aria-label={t.header.logout}
            title={t.header.logout}
            className="rounded-full px-3"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
