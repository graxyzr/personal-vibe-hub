import DOMPurify from 'isomorphic-dompurify'

export const sanitizeInput = (input: string): string => {
    if (!input) return ''

    // Remove HTML tags e caracteres perigosos
    const sanitized = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // Não permite nenhuma tag HTML
        ALLOWED_ATTR: [], // Não permite atributos
    })

    // Limita o tamanho para prevenir ataques de DOS
    return sanitized.slice(0, 1000)
}

export const validateCityName = (city: string): boolean => {
    if (!city || city.length > 100) return false

    // Permite apenas letras, espaços, hífens e apóstrofos
    const cityRegex = /^[a-zA-ZáéíóúâêîôûãõçñÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-']+$/
    return cityRegex.test(city)
}

export const validateNoteContent = (content: string): boolean => {
    return content.length > 0 && content.length <= 500
}