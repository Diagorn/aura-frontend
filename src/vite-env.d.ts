/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Базовый URL API; пусто — same-origin (в dev работает прокси Vite) */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
