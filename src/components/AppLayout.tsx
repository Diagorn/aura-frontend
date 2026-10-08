import { Outlet } from 'react-router'
import { AuroraBackground } from './AuroraBackground'
import { Header } from './Header'

/** Каркас защищённых страниц: аврора-фон + шапка + контент */
export function AppLayout() {
  return (
    <div className="relative min-h-dvh">
      <AuroraBackground />
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
