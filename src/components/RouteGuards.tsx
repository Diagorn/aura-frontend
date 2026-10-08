import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../store/AuthContext'
import { Spinner } from './ui/Spinner'
import { useTranslation } from '../i18n'

/** Экран загрузки на время бутстрапа сессии */
export function FullscreenSpinner() {
  const t = useTranslation()
  return (
    <div className="flex min-h-dvh items-center justify-center" role="status" aria-label={t.common.loading}>
      <Spinner className="size-8 text-muted" />
    </div>
  )
}

/** Пропускает внутрь только авторизованных, остальных — на /login */
export function RequireAuth() {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <FullscreenSpinner />
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}

/** Наоборот: login/register не нужны тому, кто уже вошёл */
export function PublicOnly() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <FullscreenSpinner />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}
