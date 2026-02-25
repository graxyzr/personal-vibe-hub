export interface WeatherData {
    city: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
}

export interface Note {
    id: string
    content: string
    createdAt: number
    updatedAt: number
}

export interface WeatherTheme {
    type: 'sunny' | 'rainy' | 'night'
    gradientFrom: string
    gradientTo: string
}