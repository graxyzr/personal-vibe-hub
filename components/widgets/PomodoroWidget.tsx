'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react'

type PomodoroState = 'focus' | 'break'

export function PomodoroWidget() {
    const [state, setState] = useState<PomodoroState>('focus')
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [cycles, setCycles] = useState(0)

    const FOCUS_TIME = 25 * 60
    const BREAK_TIME = 5 * 60

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            if (state === 'focus') {
                setState('break')
                setTimeLeft(BREAK_TIME)
                setCycles(prev => prev + 1)
            } else {
                setState('focus')
                setTimeLeft(FOCUS_TIME)
            }
            setIsActive(false)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft, state])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progress = state === 'focus'
        ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
        : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100

    return (
        <GlassCard ariaLabel="Timer Pomodoro" title="Pomodoro">
            <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${state === 'focus' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                        }`}>
                        {state === 'focus' ? (
                            <Target className="w-4 h-4" />
                        ) : (
                            <Coffee className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium capitalize">{state}</span>
                    </div>
                    <span className="text-white/60 text-sm">Ciclos: {cycles}</span>
                </div>

                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-white/10"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={440}
                            strokeDashoffset={440 - (440 * progress) / 100}
                            className={`transition-all duration-300 ${state === 'focus' ? 'text-red-400' : 'text-green-400'
                                }`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white tabular-nums">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={() => {
                            setIsActive(false)
                            setTimeLeft(state === 'focus' ? FOCUS_TIME : BREAK_TIME)
                        }}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </GlassCard>
    )
}