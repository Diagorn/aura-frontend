import { useTranslation } from '../i18n'
import { useAuth } from '../store/AuthContext'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/Reveal'

/** Временная главная — до этапов 2 (профиль) и 3 (каталог) */
export function HomePage() {
  const t = useTranslation()
  const { user } = useAuth()

  return (
    <Reveal>
      <Card className="p-7 sm:p-9">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          <span className="text-gradient">{t.home.greeting}</span>
          {user && `, ${user.email}`}
        </h1>
        <p className="mt-3 text-sm text-muted">{t.home.subtitle}</p>
        <p className="mt-1 text-sm text-muted">{t.home.stageHint}</p>
      </Card>
    </Reveal>
  )
}
