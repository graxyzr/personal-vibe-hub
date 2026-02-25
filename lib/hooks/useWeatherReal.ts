import { useState } from 'react'
import axios from 'axios'

interface WeatherData {
    city: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
    country: string
}

// Dados mockados pra fallback enquanto a key não ativa
const FALLBACK_DATA: Record<string, WeatherData> = {
    'são paulo': {
        city: 'São Paulo',
        country: 'BR',
        temperature: 22,
        description: 'Parcialmente nublado',
        humidity: 65,
        windSpeed: 12,
        icon: '02d'
    },
    'alasca': {
        city: 'Alasca',
        country: 'US',
        temperature: -19,
        description: 'Neve intensa',
        humidity: 85,
        windSpeed: 25,
        icon: '13d'
    }
}

export function useWeatherReal() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchWeather = async (city: string) => {
        if (!city.trim()) return

        setLoading(true)
        setError(null)

        try {
            const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

            // Tenta API real
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${API_KEY}`
            )

            const data = response.data
            setWeather({
                city: data.name,
                country: data.sys.country,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6),
                icon: data.weather[0].icon
            })
        } catch (err: any) {
            // Se API falhar (401), usa fallback
            if (err.response?.status === 401) {
                console.log('API key não ativa ainda, usando fallback')
                const fallback = FALLBACK_DATA[city.toLowerCase()]
                if (fallback) {
                    setWeather(fallback)
                } else {
                    setError('API key não ativa. Aguarde alguns minutos.')
                }
            } else if (err.response?.status === 404) {
                setError('Cidade não encontrada')
            } else {
                setError('Erro ao buscar clima')
            }
        } finally {
            setLoading(false)
        }
    }

    return { weather, loading, error, fetchWeather }
}