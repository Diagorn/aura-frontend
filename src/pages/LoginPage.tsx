import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useTranslation } from '../i18n'
import { useAuth } from '../store/AuthContext'
import { toApiError } from '../services/problem'
import { errorMessageOf } from '../lib/errors'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field } from '../components/ui/Field'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPage() {
  const t = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Куда вернуть пользователя после входа (state из RequireAuth)
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setFormError(null)

    const errors: Record<string, string> = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) errors.email = t.auth.required
    else if (!EMAIL_RE.test(trimmedEmail)) errors.email = t.auth.emailInvalid
    if (!password) errors.password = t.auth.required
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      await login({ email: trimmedEmail, password })
      navigate(from, { replace: true })
    } catch (err) {
      const apiError = toApiError(err)
      setFormError(apiError.status === 401 ? t.auth.loginFailed : errorMessageOf(err, t))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="p-7 sm:p-9">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        <span className="text-gradient">{t.auth.loginTitle}</span>
      </h1>
      <p className="mt-2 text-sm text-muted">{t.auth.loginSubtitle}</p>

      <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        {formError && <Alert>{formError}</Alert>}
        <Field
          label={t.auth.email}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
        />
        <Field
          label={t.auth.password}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />
        <Button type="submit" loading={submitting}>
          {t.auth.submitLogin}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link to="/register" className="text-violet-400 transition hover:text-fuchsia-300">
          {t.auth.toRegister}
        </Link>
      </p>
    </Card>
  )
}
