import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useTranslation } from '../i18n'
import { useAuth } from '../store/AuthContext'
import { toApiError } from '../services/problem'
import { errorMessageOf } from '../lib/errors'
import { DETECTED_TIMEZONE, timezoneOptions } from '../lib/timezones'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { SelectField } from '../components/ui/SelectField'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterPage() {
  const t = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()
  const timezoneOptionList = useMemo(timezoneOptions, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [timezone, setTimezone] = useState(DETECTED_TIMEZONE)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setFormError(null)

    const errors: Record<string, string> = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) errors.email = t.auth.required
    else if (!EMAIL_RE.test(trimmedEmail)) errors.email = t.auth.emailInvalid
    if (!password) errors.password = t.auth.required
    else if (password.length < 8) errors.password = t.auth.passwordShort
    if (confirmPassword !== password) errors.confirmPassword = t.auth.passwordMismatch
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      await register({ email: trimmedEmail, password, timezone: timezone || undefined })
      navigate('/', { replace: true })
    } catch (err) {
      const apiError = toApiError(err)
      if (apiError.status === 409) {
        setFieldErrors({ email: t.auth.emailTaken })
      } else if (apiError.status === 422) {
        setFieldErrors(apiError.fieldErrors)
      } else {
        setFormError(errorMessageOf(err, t))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="p-7 sm:p-9">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        <span className="text-gradient">{t.auth.registerTitle}</span>
      </h1>
      <p className="mt-2 text-sm text-muted">{t.auth.registerSubtitle}</p>

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
          autoComplete="new-password"
          placeholder={t.auth.passwordShort}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />
        <Field
          label={t.auth.confirmPassword}
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={fieldErrors.confirmPassword}
        />
        <div>
          <SelectField
            label={t.auth.timezone}
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
            options={timezoneOptionList}
            error={fieldErrors.timezone}
          />
          <p className="mt-1 text-xs text-muted">{t.auth.timezoneHint}</p>
        </div>
        <Button type="submit" loading={submitting}>
          {t.auth.submitRegister}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link to="/login" className="text-violet-400 transition hover:text-fuchsia-300">
          {t.auth.toLogin}
        </Link>
      </p>
    </Card>
  )
}
