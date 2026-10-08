import { Link } from 'react-router'

interface LogoProps {
  /** Куда ведёт логотип (по умолчанию — главная приложения) */
  to?: string
  className?: string
}

export function Logo({ to = '/', className = '' }: LogoProps) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 ${className}`} aria-label="Aura — на главную">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="aura-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="0.5" stopColor="#e879f9" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="29" fill="none" stroke="url(#aura-logo)" strokeOpacity="0.4" strokeWidth="3" />
        <circle cx="32" cy="32" r="17" fill="url(#aura-logo)" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">Aura</span>
    </Link>
  )
}
