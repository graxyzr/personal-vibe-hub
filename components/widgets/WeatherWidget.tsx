'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Search, MapPin, Droplets, Wind } from 'lucide-react'

interface WeatherData {
    city: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
}

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData>({
        city: 'São Paulo',
        temperature: 22,
        description: 'Parcialmente nublado',
        humidity: 65,
        windSpeed: 12,
        icon: '03d'
    })
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchInput.trim()) return

        setLoading(true)
        // Simula busca
        setTimeout(() => {
            setWeather({
                city: searchInput,
                temperature: Math.floor(Math.random() * 15) + 20,
                description: ['Ensolarado', 'Nublado', 'Chuva fraca'][Math.floor(Math.random() * 3)],
                humidity: Math.floor(Math.random() * 30) + 50,
                windSpeed: Math.floor(Math.random() * 15) + 5,
                icon: '01d'
            })
            setLoading(false)
            setSearchInput('')
        }, 800)
    }

    const getWeatherIcon = (iconCode: string) => {
        const iconMap: Record<string, string> = {
            '01d': '☀️',
            '02d': '⛅',
            '03d': '☁️',
            '04d': '☁️',
            '09d': '🌧️',
            '10d': '🌦️',
            '11d': '⛈️',
        }
        return iconMap[iconCode] || '☀️'
    }

    return (
        <GlassCard ariaLabel="Widget de clima" title="Clima">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Buscar cidade..."
                        className="w-full px-4 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-white/70" />
                            <h3 className="text-xl font-semibold text-white">{weather.city}</h3>
                        </div>
                        <span className="text-4xl">{getWeatherIcon(weather.icon)}</span>
                    </div>

                    <div className="text-center">
                        <span className="text-5xl font-bold text-white">
                            {weather.temperature}°C
                        </span>
                        <p className="text-white/70 mt-1 capitalize">{weather.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-white/60" />
                            <span className="text-white/80">{weather.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Wind className="w-4 h-4 text-white/60" />
                            <span className="text-white/80">{weather.windSpeed} km/h</span>
                        </div>
                    </div>
                </div>
            )}
        </GlassCard>
    )
}