# aura-frontend

Веб-фронтенд трекера эмоций **Aura**: аутентификация, профиль и справочники
(эмоции, факторы, события, метрики) поверх [aura-backend](https://github.com/Diagorn/aura-backend).

Тема, шрифты и визуальный язык взяты из [aura-landing](https://github.com/Diagorn/aura-landing).

## Стек

- React 19 + Vite + TypeScript
- TailwindCSS v4 — тёмная и светлая темы (переключатель в шапке)
- react-router v7, TanStack Query v5, axios (авто-refresh JWT)
- framer-motion, lucide-react

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # прод-сборка (tsc -b && vite build)
npm run preview  # локальный просмотр сборки
npm run lint     # eslint
```

Бэкенд ожидается на `http://localhost:8080` (в dev проксируется через Vite, см. `vite.config.ts`).

## Конфигурация

- `VITE_API_BASE_URL` — базовый URL API; по умолчанию пусто (same-origin, работает dev-прокси). См. `.env.example`.

## Структура и план

Структура папок — по `AGENTS.md`; план работ и прогресс — в [docs/plan.md](docs/plan.md).
