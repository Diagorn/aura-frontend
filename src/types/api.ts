/** RFC 9457 problem+json — формат ошибок API (см. спеку бэкенда) */
export interface Problem {
  type?: string
  title?: string
  status?: number
  code?: string
  errors?: ProblemError[]
}

export interface ProblemError {
  field?: string
  message?: string
}

export interface TelegramProfile {
  /** ID пользователя в Telegram (= chat_id в личном чате) */
  userId: string
  /** @username, может отсутствовать */
  username?: string | null
}

/** Профиль текущего пользователя — GET/PATCH /api/v1/me */
export interface MeResponse {
  id: number
  email: string
  /** IANA-таймзона, например Europe/Moscow */
  timezone: string
  /** Локаль, например ru */
  locale: string
  telegram: TelegramProfile | null
}

/** Пара токенов, возвращается register/login/refresh */
export interface AuthResponse {
  user: MeResponse
  /** JWT access-токен, 15 минут */
  accessToken: string
  /** JWT refresh-токен, 30 дней, ротируется при каждом обновлении */
  refreshToken: string
}

export interface RegisterRequest {
  email: string
  password: string
  /** IANA-таймзона; по умолчанию бэкенд берёт Europe/Moscow */
  timezone?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface LogoutRequest {
  refreshToken: string
}

export interface UpdateMeRequest {
  timezone?: string
  locale?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface TelegramLinkCodeResponse {
  code: string
  /** Момент истечения кода (10 минут с выдачи) */
  expiresAt: string
}
