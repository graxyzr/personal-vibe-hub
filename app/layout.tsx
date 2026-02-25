import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AnimatedBackground } from '../components/ui/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal Productivity Vibe Hub',
  description: 'Seu dashboard pessoal de produtividade com estilo Bento e Glassmorphism',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AnimatedBackground />
        <main className="relative min-h-screen p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}