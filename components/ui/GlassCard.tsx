'use client'

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
            className={cn('glass-card card-enter p-6', className)}
        >
            {title && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4 select-none">
                    {title}
                </p>
            )}
            {children}
        </section>
    )
}