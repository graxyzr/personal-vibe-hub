import { BentoGrid } from '../components/layout/BentoGrid'
import { ClockWidget } from '../components/widgets/ClockWidget'
import { WeatherWidget } from '../components/widgets/WeatherWidget'
import { PomodoroWidget } from '../components/widgets/PomodoroWidget'
import { NotesWidget } from '../components/widgets/NotesWidget'

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Personal Productivity Vibe Hub
        </h1>
        <p className="text-white/70">
          Seu espaço pessoal para produtividade com estilo
        </p>
      </header>

      <BentoGrid>
        {/* Widgets principais */}
        <ClockWidget />
        <WeatherWidget />
        <PomodoroWidget />

        {/* Widget de notas ocupa 2 colunas no desktop */}
        <NotesWidget />

        {/* Espaço para futuros widgets */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 h-full flex items-center justify-center">
            <p className="text-white/40 text-center">
              Mais widgets em breve...
            </p>
          </div>
        </div>
      </BentoGrid>

      <footer className="mt-8 text-center text-white/40 text-sm">
        <p>© 2024 Personal Productivity Vibe Hub. Todos os direitos reservados.</p>
        <p className="mt-1">
          Navegue usando Tab • Enter para interagir • Esc para sair
        </p>
      </footer>
    </div>
  )
}