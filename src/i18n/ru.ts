import type { Dictionary } from './types'

export const ru: Dictionary = {
  meta: {
    title: 'Aura — трекер эмоций',
    description:
      'Веб-приложение трекера эмоций Aura: отмечайте эмоции, их факторы и события, ведите справочники под себя.',
  },
  header: {
    home: 'Главная',
    profile: 'Профиль',
    logout: 'Выйти',
  },
  auth: {
    loginTitle: 'С возвращением',
    loginSubtitle: 'Войдите, чтобы продолжить отслеживать свои эмоции',
    registerTitle: 'Создать аккаунт',
    registerSubtitle: 'Пара шагов — и вы можете записывать эмоции',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Повторите пароль',
    timezone: 'Часовой пояс',
    timezoneHint: 'Определён автоматически по вашему браузеру',
    submitLogin: 'Войти',
    submitRegister: 'Зарегистрироваться',
    submitting: 'Отправляем…',
    toRegister: 'Нет аккаунта? Зарегистрироваться',
    toLogin: 'Уже есть аккаунт? Войти',
    loginFailed: 'Неверный email или пароль',
    emailTaken: 'Этот email уже занят',
    passwordMismatch: 'Пароли не совпадают',
    required: 'Заполните поле',
    emailInvalid: 'Похоже, в адресе ошибка',
    passwordShort: 'Минимум 8 символов',
    invalidField: 'Проверьте значение',
    unexpectedError: 'Что-то пошло не так. Попробуйте ещё раз',
    networkError: 'Сервер недоступен. Проверьте, что бэкенд запущен',
  },
  home: {
    greeting: 'Добро пожаловать',
    subtitle: 'Каркас приложения готов: сессия восстановлена, тема и API подключены.',
    stageHint: 'Дальше по плану: этап 2 — профиль, этап 3 — каталог справочников.',
  },
  notFound: {
    title: 'Страница не найдена',
    text: 'Здесь тихо и пусто — как в дневнике до первого чек-ина.',
    home: 'На главную',
  },
  common: {
    loading: 'Загрузка…',
  },
}
