import type { Dictionary } from '../i18n/types'
import { toApiError } from '../services/problem'

/** Человекочитаемое сообщение об ошибке запроса для показа в форме */
export function errorMessageOf(err: unknown, t: Dictionary): string {
  const apiError = toApiError(err)
  if (apiError.status === 0) return t.auth.networkError
  return apiError.message || t.auth.unexpectedError
}
