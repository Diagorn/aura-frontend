import { isAxiosError } from 'axios'
import type { Problem, ProblemError } from '../types/api'

/** Ошибка API с разобранным RFC 9457 problem+json */
export class ApiError extends Error {
  /** HTTP-статус; 0 — сеть недоступна / запрос не дошёл */
  readonly status: number
  readonly problem: Problem

  constructor(message: string, status: number, problem: Problem) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.problem = problem
  }

  /** Первая ошибка валидации, если бэкенд вернул errors[] */
  get firstFieldError(): ProblemError | undefined {
    return this.problem.errors?.[0]
  }

  /** Ошибки валидации, разложенные по именам полей: { email: '…', password: '…' } */
  get fieldErrors(): Record<string, string> {
    return fieldErrorsOf(this.problem, this.message)
  }
}

/** Разбирает problem.errors[] в словарь «поле → сообщение» */
export function fieldErrorsOf(problem: Problem, fallback: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const item of problem.errors ?? []) {
    if (item.field) result[item.field] = item.message || fallback
  }
  return result
}

/** Разворачивает произвольную ошибку запроса в ApiError */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 0
    const problem = (error.response?.data as Problem | undefined) ?? {}
    const message = problem.title ?? error.message
    return new ApiError(message, status, problem)
  }
  return new ApiError(error instanceof Error ? error.message : 'Неизвестная ошибка', 0, {})
}
