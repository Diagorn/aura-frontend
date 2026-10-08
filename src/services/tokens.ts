const ACCESS_KEY = 'aura.accessToken'
const REFRESH_KEY = 'aura.refreshToken'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    // приватный режим или отключённый localStorage
    return null
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // игнорируем — токены просто не сохранятся между сессиями
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // игнорируем
  }
}

/** JWT-токены сессии (оба в localStorage — согласованное решение по проекту) */
export const tokens = {
  getAccess: () => read(ACCESS_KEY),
  getRefresh: () => read(REFRESH_KEY),
  save: (access: string, refresh: string) => {
    write(ACCESS_KEY, access)
    write(REFRESH_KEY, refresh)
  },
  clear: () => {
    remove(ACCESS_KEY)
    remove(REFRESH_KEY)
  },
}

/** Событие «сессию восстановить не удалось» — AuthContext выходит из аккаунта */
export const UNAUTHORIZED_EVENT = 'aura:unauthorized'

export function notifyUnauthorized(): void {
  window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT))
}
