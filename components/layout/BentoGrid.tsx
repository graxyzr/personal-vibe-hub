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
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
                'auto-rows-min',
                className
            )}
        >
            {children}
        </div>
    )
}