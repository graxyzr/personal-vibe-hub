import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { AnimatedBackground } from '../components/ui/AnimatedBackground'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Personal Productivity Vibe Hub',
  description: 'Seu dashboard pessoal de produtividade com estilo Bento e Glassmorphism',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.className} antialiased`}>
        <AnimatedBackground />
        <main className="relative min-h-screen py-8 md:py-12 flex justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}