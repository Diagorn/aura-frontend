import { Outlet } from 'react-router'
import { AuroraBackground } from './AuroraBackground'
import { Reveal } from './Reveal'
import { ThemeToggle } from './ThemeToggle'

/** Центрированная glass-карточка на аврора-фоне — для входа и регистрации */
export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <AuroraBackground />
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <Reveal className="w-full max-w-md">
        <Outlet />
      </Reveal>
    </div>
  )
}
