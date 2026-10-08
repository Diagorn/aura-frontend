// Базовый URL API Aura.
// Пустая строка — запросы на тот же origin: в dev срабатывает прокси Vite
// (/api -> http://localhost:8080), в проде фронт обычно раздаётся за
// reverse-proxy рядом с API. Для отдельного хоста API задайте
// VITE_API_BASE_URL (см. .env.example).
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''
