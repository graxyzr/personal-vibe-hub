import { BentoGrid } from '../components/layout/BentoGrid'
import { ClockWidget } from '../components/widgets/ClockWidget'
import { WeatherWidget } from '../components/widgets/WeatherWidget'
import { PomodoroWidget } from '../components/widgets/PomodoroWidget'
import { NotesWidget } from '../components/widgets/NotesWidget'

export default function HomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">

      <header className="mb-8 pt-2">
        <h1 className="text-gradient title-glow text-3xl md:text-4xl font-bold mb-1 tracking-tight">
          Personal Productivity Vibe Hub
        </h1>
        <p className="text-white/50 text-sm tracking-wide">
          Seu espaço pessoal para produtividade com estilo
        </p>
      </header>

      <BentoGrid>
        <ClockWidget />
        <WeatherWidget />
        <PomodoroWidget />
        <NotesWidget />

        {/* Placeholder widget */}
        <div className="glass-card card-enter p-6 flex items-center justify-center min-h-[120px]">
          <p className="text-white/25 text-sm text-center tracking-wide">
            Mais widgets em breve…
          </p>
        </div>
      </BentoGrid>

      <footer className="mt-10 mb-4 text-center text-white/25 text-xs tracking-wide space-y-1">
        <p>© 2024 Personal Productivity Vibe Hub</p>
        <p>Tab para navegar · Enter para interagir · Esc para sair</p>
      </footer>

    </div>
  )
}