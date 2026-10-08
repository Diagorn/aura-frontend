import { api } from './client'
import { toApiError } from './problem'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/api'

export const authApi = {
  /** Регистрация: бэкенд сразу возвращает пару токенов и профиль */
  async register(input: RegisterRequest): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>('/api/v1/auth/register', input)
      return data
    } catch (error) {
      throw toApiError(error)
    }
  },

  /** Вход по email и паролю */
  async login(input: LoginRequest): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>('/api/v1/auth/login', input)
      return data
    } catch (error) {
      throw toApiError(error)
    }
  },

  /**
   * Выход: отзывает refresh-токен на сервере. Операция идемпотентна,
   * а сетевые ошибки не должны мешать локальному выходу — поэтому глушим.
   */
  async logout(refreshToken: string): Promise<void> {
    try {
      await api.post('/api/v1/auth/logout', { refreshToken })
    } catch {
      // игнорируем — локальное состояние чистим в любом случае
    }
  },
}
