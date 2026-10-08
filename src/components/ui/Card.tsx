import type { HTMLAttributes } from 'react'

/** «Стеклянная» карточка — базовая поверхность в стиле aura-landing */
export function Card({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass rounded-3xl ${className}`} {...rest} />
}
