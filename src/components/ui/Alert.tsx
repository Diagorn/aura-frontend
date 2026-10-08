import type { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  tone?: 'error' | 'info'
}

/** Плашка с сообщением — ошибки форм и прочие уведомления */
export function Alert({ children, tone = 'error' }: AlertProps) {
  const tones = {
    error: 'border-red-400/30 bg-red-500/10 text-red-300',
    info: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  } as const

  return (
    <div role="alert" className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>
      {children}
    </div>
  )
}
