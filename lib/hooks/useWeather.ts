import { useState, useEffect } from 'react'

interface WeatherData {
    city: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
}

interface WeatherTheme {
    type: 'sunny' | 'rainy' | 'night'
    gradientFrom: string
    gradientTo: string
}

// Dados mockados para demonstração
const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
    'são paulo': {
        city: 'São Paulo',
        temperature: 22,
        description: 'Parcialmente nublado',
        humidity: 65,
        windSpeed: 12,
        icon: '03d'
    },
    'rio de janeiro': {
        city: 'Rio de Janeiro',
        temperature: 28,
        description: 'Ensolarado',
        humidity: 70,
        windSpeed: 8,
        icon: '01d'
    },
    'default': {
        city: 'Carregando...',
        temperature: 0,
        description: '--',
        humidity: 0,
        windSpeed: 0,
        icon: '01d'
    }
}

export function useWeather(initialCity: string = 'São Paulo') {
    const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER_DATA.default)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [city, setCity] = useState(initialCity)

    const getWeatherTheme = (weatherData: WeatherData): WeatherTheme => {
        // Determina o tema baseado na hora do dia e condições climáticas
        const hour = new Date().getHours()
        const isNight = hour < 6 || hour > 18

        if (isNight) {
            return {
                type: 'night',
                gradientFrom: 'from-indigo-900',
                gradientTo: 'to-black'
            }
        }

        if (weatherData.description.includes('chuva') || weatherData.description.includes('rain')) {
            return {
                type: 'rainy',
                gradientFrom: 'from-slate-700',
                gradientTo: 'to-blue-900'
            }
        }

        return {
            type: 'sunny',
            gradientFrom: 'from-amber-200',
            gradientTo: 'to-yellow-500'
        }
    }

    const fetchWeather = async (searchCity: string) => {
        setLoading(true)
        setError(null)

        try {
            // Simula uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 800))

            const normalizedCity = searchCity.toLowerCase()
            const weatherData = MOCK_WEATHER_DATA[normalizedCity] || {
                ...MOCK_WEATHER_DATA.default,
                city: searchCity,
                temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
                description: ['Ensolarado', 'Parcialmente nublado', 'Chuva fraca'][Math.floor(Math.random() * 3)]
            }

            setWeather(weatherData)
        } catch (err) {
            setError('Erro ao buscar dados do clima')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather(city)
    }, [])

    return {
        weather,
        loading,
        error,
        fetchWeather,
        city,
        setCity,
        getWeatherTheme: getWeatherTheme(weather)
    }
}