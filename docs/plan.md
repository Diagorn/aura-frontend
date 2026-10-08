# Aura Frontend — план разработки

> Прогресс отмечается в чек-листах: `[ ]` — предстоит, `[x]` — сделано.
> Файл обновляется после каждого рабочего сеанса.

## Контекст

- **Репозиторий**: `C:\Users\Admin\WebstormProjects\aura-frontend`.
- **Бэкенд**: https://github.com/Diagorn/aura-backend — Spring Boot 4 / Kotlin, `http://localhost:8080`.
  Спека: `api/openapi/**` (api.yaml + paths/ + components/). Ошибки — RFC 9457 `application/problem+json`.
  Сейчас в API: auth (register/login/refresh/logout/telegram-link-code),
  me (GET/PATCH, PUT password), catalog (emotions/factors/events/metrics CRUD).
  **Нет в API**: entries, notes, analytics (этапы 3–5 роадмапа бэкенда) — не делаем.
- **Тема**: https://github.com/Diagorn/aura-landing — index.css (токены, glass, text-gradient, noise),
  инлайн-скрипт темы в index.html, favicon.svg, компоненты AuroraBackground, Logo, ThemeToggle.
  Шрифты: Manrope Variable + Unbounded Variable (@fontsource-variable). Градиент: `#8b5cf6 → #e879f9 → #22d3ee`.

## Принятые решения (согласовано с пользователем)

| Вопрос | Решение |
|---|---|
| Объём | Auth + профиль + каталог, **3 этапа** |
| Данные | TanStack Query v5 + axios |
| Роутер | react-router v7 (пакет `react-router`) |
| Auth-состояние | React Context |
| Токены | оба в localStorage (`aura.accessToken`, `aura.refreshToken`) |
| Язык UI | только ru |
| i18n | паттерн лендинга: `src/i18n/{types,ru,index}.ts`, ноль зависимостей |
| Качество кода | ESLint (flat config, typescript-eslint), без Prettier; строгий tsconfig |
| env | `VITE_API_BASE_URL` (по умолчанию пусто → same-origin, dev-прокси Vite → `localhost:8080`) |

### Соотношение с AGENTS.md (generic-шаблон React-проекта)

Стек из AGENTS.md (React 18, Router v6, Zustand, AntD/MUI, Prettier+Husky) **не применяется** —
приоритет у решений пользователя и паритета с aura-landing. Из шаблона взяты конвенции:
структура `src/{components/{ui,...},pages,hooks,services,store,types}`, function-компоненты
с типизированными пропсами, паттерн axios-сервиса, `lazy`-code-splitting по мере роста.

---

## Этап 1 — Каркас, тема, аутентификация

### 1.1 Скелет проекта
- [x] `docs/plan.md` (этот файл) — прогресс-документ
- [x] package.json, tsconfig (project references, strict), vite.config.ts (react + tailwindcss + proxy `/api` → `http://localhost:8080`)
- [x] Зависимости: react 19, react-router v7, @tanstack/react-query, axios, framer-motion, lucide-react, @fontsource-variable/{manrope,unbounded}
- [x] Dev-зависимости: tailwindcss v4, @tailwindcss/vite, vite, typescript, eslint + typescript-eslint + react-hooks/react-refresh плагины
- [x] Скрипты: `dev`, `build` (tsc -b && vite build), `preview`, `lint`
- [x] `.env.example` (VITE_API_BASE_URL), `.gitignore`, `README.md`
- [x] `eslint.config.js` (flat config)

### 1.2 Тема из лендинга
- [x] `index.html` — title, meta, инлайн-скрипт темы `aura-theme`, favicon
- [x] `public/favicon.svg` — скопирован с лендинга
- [x] `src/index.css` — портирован (токены light/dark, @theme, glass, header-glass, text-gradient, noise, keyframes) + добавлен `color-scheme` для нативных контролов
- [x] `src/lib/animation.ts` (EASE), компоненты `AuroraBackground`, `Logo` (Link вместо `<a>`), `ThemeToggle`, `Reveal`

### 1.3 i18n (паттерн лендинга)
- [x] `src/i18n/types.ts`, `src/i18n/ru.ts`, `src/i18n/index.ts` (`useTranslation`)

### 1.4 API-инфраструктура
- [x] `src/types/api.ts` — Problem, MeResponse, TelegramProfile, AuthResponse, запросы auth
- [x] `src/services/tokens.ts` — localStorage-хранилище токенов + событие `aura:unauthorized`
- [x] `src/services/problem.ts` — ApiError + парсинг RFC 9457
- [x] `src/services/client.ts` — axios: Bearer-интерцептор, single-flight refresh по 401, retry, notifyUnauthorized при провале
- [x] `src/services/auth.ts` — register, login, logout
- [x] `src/services/me.ts` — getMe (бутстрап сессии)

### 1.5 Auth-состояние и роутинг
- [x] `src/store/AuthContext.tsx` — user/isLoading/login/register/logout/updateUser, bootstrap по /me, подписка на unauthorized
- [x] `src/main.tsx` — QueryClientProvider → AuthProvider → App
- [x] `src/App.tsx` — маршруты: `/login`, `/register` (PublicOnly), `/` (RequireAuth + AppLayout), `*` → NotFound
- [x] `src/components/RouteGuards.tsx` — RequireAuth, PublicOnly
- [x] `src/components/AppLayout.tsx` — AuroraBackground + Header + Outlet

### 1.6 UI аутентификации
- [x] ui-примитивы: `Button`, `Card`, `Field`, `SelectField`, `Alert`, `Spinner`
- [x] `Header.tsx` — logo, email пользователя, ThemeToggle, выход
- [x] `AuthLayout.tsx` — аврора-фон + центрированная glass-карточка
- [x] `LoginPage.tsx` — валидация, ошибка 401 → понятное сообщение, редирект «откуда пришли»
- [x] `RegisterPage.tsx` — email/пароль+подтверждение/таймзона (Intl-детект + supportedValuesOf), 409 → «Email занят», 422 → маппинг на поля
- [x] `HomePage.tsx` — заглушка до этапа 2; `NotFoundPage.tsx`

**Готово, когда:** регистрация → автовход → email в шапке; F5 сохраняет сессию; истёкший access
прозрачно обновляется; logout чистит состояние; `npm run lint` и `npm run build` зелёные.
**Статус этапа 1:** код готов, `npm run build` и `npm run lint` — зелёные. Runtime-сценарии
(регистрация/refresh/logout против живого API) — проверить вручную: `docker compose up -d` в
aura-backend + `npm run dev`.

---

## Этап 2 — Профиль

- [ ] `src/services/me.ts` — patchMe, changePassword
- [ ] `src/pages/ProfilePage.tsx` (маршрут `/profile`, RequireAuth):
  - [ ] Карточка профиля: email, id, таймзона, локаль, статус Telegram (@username / не привязан)
  - [ ] Форма настроек: таймзона, локаль (`^[a-zA-Z]{2}(-[a-zA-Z]{2})?$`) → PATCH `/api/v1/me`, апдейт AuthContext
  - [ ] Смена пароля: текущий/новый/подтверждение → PUT `/api/v1/me/password`; 422 `errors=[{field:"currentPassword"}]` → на поле
  - [ ] Telegram-карточка: POST `/api/v1/auth/telegram/link-code`, код + таймер до `expiresAt`; 409 → «уже связан»
- [ ] Роут `/` → редирект на `/profile`; навигация в шапке

**Готово, когда:** настройки сохраняются (видны после F5), смена пароля работает с ошибкой
неверного текущего, код Telegram генерируется с обратным отсчётом.

---

## Этап 3 — Каталог справочников

### 3.1 Подготовка
- [ ] Изучить `api/openapi/paths/catalog.yaml` и `components/schemas/catalog.yaml` бэкенда
      (поля элементов, пагинация page/size, механика скрытия системных)
- [ ] `src/types/catalog.ts`, `src/services/catalog.ts` — list (merged), create, patch, deactivate, delete, hide

### 3.2 UI
- [ ] `src/pages/CatalogPage.tsx` (маршрут `/catalog`): вкладки Эмоции/Факторы/События/Метрики
  - [ ] Список: glass-строки, бейджи «системный»/«свой», «активный»/«деактивирован», пагинация
  - [ ] Создание (имя 1–100, опц. описание), правка, деактивация, удаление (с подтверждением)
  - [ ] Скрытие/восстановление системных; 403/404 → аккуратные сообщения
- [ ] Хуки TanStack Query (`useCatalog` + мутации с инвалидацией) в `src/hooks/`
- [ ] Роут `/` → `/catalog`; навигация в шапке: Каталог / Профиль

**Готово, когда:** полный цикл CRUD для всех 4 справочников против живого бэкенда; системные
видны, скрываются, не редактируются; build/lint зелёные.

---

## После этапа 3 (вне текущего скоупа)

- Страницы entries / notes / analytics — когда бэкенд допишет этапы 3–5 и добавит их в спеку.
- Переключатель ru/en (словарь Dictionary уже готов).
- Prettier/CI — по желанию.

---

## Журнал

### Этап 1 — выполнен (2026-10-08)

Отклонения и принятые решения в ходе реализации:

- **TypeScript `~5.9` вместо `7.0.2` как в лендинге**: typescript-eslint (пир-зависимость ESLint,
  выбранного пользователем) поддерживает TS `<6.1`. Код совместим с обеими версиями — после
  выпуска поддержки TS7 в typescript-eslint можно поднять.
- **react-router `^7.18`**: latest уже v8, фиксируем седьмую мажорную по решению пользователя
  (пакет `react-router`, импорты из `react-router`, без `react-router-dom`).
- **`AuthLayout` рендерит `<Outlet/>`** (как `AppLayout`) — иначе несовместим с паттерном
  `<Route element={...}>` в react-router.
- **В `index.css` добавлены `color-scheme: light/dark`** — чтобы нативные контролы
  (`<select>` таймзоны, скроллбары) соответствовали теме. Остальной CSS — 1:1 из лендинга.
- **Роутинг-гарды**: `RequireAuth` / `PublicOnly` в `src/components/RouteGuards.tsx`,
  спиннер бутстрапа — `FullscreenSpinner`.
- **Провал refresh-токена** (истёк/reuse detection) → событие `aura:unauthorized` →
  `AuthContext` разлогинивает, гарды кидают на `/login`; перезапуска страницы нет.
- **Структура папок** — по AGENTS.md (`services/`, `store/`, `types/`, `hooks/`, `pages/`,
  `components/ui`); `src/index.css` и `src/i18n/` — паритет с aura-landing для лёгкого слива
  будущих правок темы.
