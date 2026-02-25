'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Clock, Calendar } from 'lucide-react'

export function ClockWidget() {
    const [time, setTime] = useState(new Date())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formattedTime = time.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    const formattedDate = time.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // Renderiza um placeholder no servidor e o relógio real só no cliente
    if (!mounted) {
        return (
            <GlassCard ariaLabel="Relógio e data atual" className="text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2 text-white/80">
                        <Clock className="w-5 h-5" />
                        <span className="text-4xl font-bold text-white tabular-nums">
                            --:--:--
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-lg capitalize">
                            Carregando...
                        </span>
                    </div>
                </div>
            </GlassCard>
        )
    }

    return (
        <GlassCard ariaLabel="Relógio e data atual" className="text-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2 text-white/80">
                    <Clock className="w-5 h-5" aria-label="Ícone de relógio" />
                    <span className="text-4xl font-bold text-white tabular-nums">
                        {formattedTime}
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-white/60">
                    <Calendar className="w-4 h-4" aria-label="Ícone de calendário" />
                    <span className="text-lg capitalize">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </GlassCard>
    )
}