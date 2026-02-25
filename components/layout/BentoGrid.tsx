import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BentoGridProps {
    children: ReactNode
    className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                'grid gap-4 md:gap-5',
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                'auto-rows-auto',
                className
            )}
        >
            {children}
        </div>
    )
}