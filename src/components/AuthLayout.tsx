import { Outlet } from 'react-router'
import { AuroraBackground } from './AuroraBackground'
import { Reveal } from './Reveal'

/** Центрированная glass-карточка на аврора-фоне — для входа и регистрации */
export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <AuroraBackground />
      <Reveal className="w-full max-w-md">
        <Outlet />
      </Reveal>
    </div>
  )
}
