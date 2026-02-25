'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Search, MapPin, Droplets, Wind, AlertCircle } from 'lucide-react'
import { useWeatherReal } from '@/lib/hooks/useWeatherReal'

export function WeatherWidget() {
    const { weather, loading, error, fetchWeather } = useWeatherReal()
    const [searchInput, setSearchInput] = useState('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Cidade padrão ao carregar
        fetchWeather('São Paulo')
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchInput.trim()) return
        fetchWeather(searchInput)
        setSearchInput('')
    }

    const getWeatherIcon = (iconCode: string) => {
        // Mapeia os códigos da OpenWeather para emojis
        const iconMap: Record<string, string> = {
            '01d': '☀️', // céu limpo dia
            '01n': '🌙', // céu limpo noite
            '02d': '⛅', // poucas nuvens dia
            '02n': '☁️', // poucas nuvens noite
            '03d': '☁️', // nuvens dispersas
            '03n': '☁️',
            '04d': '☁️', // nublado
            '04n': '☁️',
            '09d': '🌧️', // chuva leve
            '09n': '🌧️',
            '10d': '🌦️', // chuva dia
            '10n': '🌧️', // chuva noite
            '11d': '⛈️', // tempestade
            '11n': '⛈️',
            '13d': '❄️', // neve
            '13n': '❄️',
            '50d': '🌫️', // névoa
            '50n': '🌫️',
        }
        return iconMap[iconCode] || '☀️'
    }

    if (!mounted) {
        return (
            <GlassCard ariaLabel="Widget de clima" title="Clima">
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
            </GlassCard>
        )
    }

    return (
        <GlassCard ariaLabel="Widget de clima" title="Clima">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Ex: Londres, Tóquio, Nova York..."
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

            {loading && (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
            )}

            {error && (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                    <AlertCircle className="w-8 h-8 text-red-300 mb-2" />
                    <p className="text-red-300">{error}</p>
                </div>
            )}

            {weather && !loading && !error && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-white/70" />
                            <h3 className="text-xl font-semibold text-white">
                                {weather.city}, {weather.country}
                            </h3>
                        </div>
                        <span className="text-4xl" role="img" aria-label={weather.description}>
                            {getWeatherIcon(weather.icon)}
                        </span>
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