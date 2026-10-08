import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '../config'
import type { AuthResponse } from '../types/api'
import { notifyUnauthorized, tokens } from './tokens'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
})

api.interceptors.request.use((config) => {
  const access = tokens.getAccess()
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

// Single-flight: параллельные 401 ждут один общий refresh, а не запускают по своему
let refreshPromise: Promise<string> | null = null

function refreshTokens(): Promise<string> {
  const refresh = tokens.getRefresh()
  if (!refresh) return Promise.reject(new Error('Нет refresh-токена'))
  // «Голый» axios без интерцепторов — иначе refresh сам зациклится на 401
  return axios
    .post<AuthResponse>(`${API_BASE_URL}/api/v1/auth/refresh`, { refreshToken: refresh })
    .then(({ data }) => {
      // Ротация: старый refresh отозван, сохраняем новую пару
      tokens.save(data.accessToken, data.refreshToken)
      return data.accessToken
    })
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    // Свои 401 у auth-эндпоинтов (неверный пароль и т.п.) — не повод для refresh
    const isAuthEndpoint = original?.url?.includes('/auth/') ?? false

    if (!original || original._retry || error.response?.status !== 401 || isAuthEndpoint) {
      return Promise.reject(error)
    }

    original._retry = true
    try {
      refreshPromise ??= refreshTokens().finally(() => {
        refreshPromise = null
      })
      const access = await refreshPromise
      original.headers.Authorization = `Bearer ${access}`
      return api(original)
    } catch {
      // Refresh не удался — сессии больше нет
      tokens.clear()
      notifyUnauthorized()
      return Promise.reject(error)
    }
  },
)
