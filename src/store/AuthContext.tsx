/* eslint-disable react-refresh/only-export-components -- контекст и хук живут в одном файле */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthResponse, LoginRequest, MeResponse, RegisterRequest } from '../types/api'
import { authApi } from '../services/auth'
import { meApi } from '../services/me'
import { tokens, UNAUTHORIZED_EVENT } from '../services/tokens'

interface AuthContextValue {
  user: MeResponse | null
  /** Идёт начальное восстановление сессии по сохранённым токенам */
  isLoading: boolean
  login: (input: LoginRequest) => Promise<void>
  register: (input: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  /** Локальное обновление профиля после PATCH /me (этап 2) */
  updateUser: (user: MeResponse) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function applyAuth(data: AuthResponse): MeResponse {
  tokens.save(data.accessToken, data.refreshToken)
  return data.user
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Бутстрап: есть сохранённый access-токен — пробуем восстановить сессию через /me.
  // 401 внутри перехватит интерцептор (refresh с ротацией); сюда дойдёт лишь окончательный провал.
  useEffect(() => {
    let cancelled = false
    if (!tokens.getAccess()) {
      setIsLoading(false)
      return
    }
    meApi
      .get()
      .then((me) => {
        if (!cancelled) setUser(me)
      })
      .catch(() => {
        if (!cancelled) {
          tokens.clear()
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Интерцептор не смог обновить сессию (refresh истёк/reuse detection) — разлогиниваемся
  useEffect(() => {
    const onUnauthorized = () => setUser(null)
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const login = useCallback(async (input: LoginRequest) => {
    setUser(applyAuth(await authApi.login(input)))
  }, [])

  const register = useCallback(async (input: RegisterRequest) => {
    setUser(applyAuth(await authApi.register(input)))
  }, [])

  const logout = useCallback(async () => {
    const refresh = tokens.getRefresh()
    if (refresh) await authApi.logout(refresh)
    tokens.clear()
    setUser(null)
  }, [])

  const updateUser = useCallback((me: MeResponse) => setUser(me), [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, login, register, logout, updateUser }),
    [user, isLoading, login, register, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth должен вызываться внутри AuthProvider')
  return ctx
}
