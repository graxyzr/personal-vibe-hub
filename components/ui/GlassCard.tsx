import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
    children: ReactNode
    className?: string
    title?: string
    ariaLabel?: string
}

export function GlassCard({ children, className, title, ariaLabel }: GlassCardProps) {
    return (
        <section
            aria-label={ariaLabel || title}
            className={cn(
                'backdrop-blur-md bg-white/10 rounded-2xl p-6',
                'border border-white/20 shadow-xl',
                'transition-all duration-300 hover:bg-white/15',
                className
            )}
        >
            {title && (
                <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
            )}
            {children}
        </section>
    )
}