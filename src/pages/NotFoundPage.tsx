import { Link } from 'react-router'
import { useTranslation } from '../i18n'
import { AuroraBackground } from '../components/AuroraBackground'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/Reveal'

const homeLinkClasses =
  'inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-90'

export function NotFoundPage() {
  const t = useTranslation()

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <AuroraBackground />
      <Reveal>
        <Card className="flex flex-col items-center gap-4 p-9 text-center">
          <p className="font-display text-5xl font-bold">
            <span className="text-gradient">404</span>
          </p>
          <h1 className="font-display text-xl font-bold">{t.notFound.title}</h1>
          <p className="text-sm text-muted">{t.notFound.text}</p>
          <Link to="/" className={homeLinkClasses}>
            {t.notFound.home}
          </Link>
        </Card>
      </Reveal>
    </div>
  )
}
