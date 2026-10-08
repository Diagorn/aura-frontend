import { useId, type InputHTMLAttributes } from 'react'

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/** Текстовое поле с подписью и сообщением об ошибке */
export function Field({ label, error, className = '', id, ...rest }: FieldProps) {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={fieldId}
        className={`h-11 rounded-xl border bg-card px-3.5 text-sm text-fg transition placeholder:text-muted/60 focus:border-violet-400/60 focus:outline-none ${
          error ? 'border-red-400/60' : 'border-line'
        } ${className}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
