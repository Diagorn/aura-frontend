export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  header: {
    home: string
    profile: string
    logout: string
  }
  auth: {
    loginTitle: string
    loginSubtitle: string
    registerTitle: string
    registerSubtitle: string
    email: string
    password: string
    confirmPassword: string
    timezone: string
    timezoneHint: string
    submitLogin: string
    submitRegister: string
    submitting: string
    toRegister: string
    toLogin: string
    loginFailed: string
    emailTaken: string
    passwordMismatch: string
    required: string
    emailInvalid: string
    passwordShort: string
    invalidField: string
    unexpectedError: string
    networkError: string
  }
  home: {
    greeting: string
    subtitle: string
    stageHint: string
  }
  notFound: {
    title: string
    text: string
    home: string
  }
  common: {
    loading: string
  }
}
