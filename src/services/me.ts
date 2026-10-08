import { api } from './client'
import { toApiError } from './problem'
import type { MeResponse } from '../types/api'

export const meApi = {
  /** Профиль текущего пользователя (используется и для бутстрапа сессии) */
  async get(): Promise<MeResponse> {
    try {
      const { data } = await api.get<MeResponse>('/api/v1/me')
      return data
    } catch (error) {
      throw toApiError(error)
    }
  },
}
