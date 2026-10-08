import { ChevronDown } from 'lucide-react'
import { useId, type SelectHTMLAttributes } from 'react'

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: Array<{ value: string; label: string }>
}

/** Выпадающий список с подписью и сообщением об ошибке */
export function SelectField({ label, error, options, className = '', id, ...rest }: SelectFieldProps) {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          className={`h-11 w-full appearance-none rounded-xl border bg-card px-3.5 pr-10 text-sm text-fg transition focus:border-violet-400/60 focus:outline-none ${
            error ? 'border-red-400/60' : 'border-line'
          } ${className}`}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
