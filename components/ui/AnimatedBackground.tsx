'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Gradiente animado de fundo */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(125deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
                        'linear-gradient(125deg, #334155 0%, #1e3a8a 50%, #0f172a 100%)',
                        'linear-gradient(125deg, #312e81 0%, #1e1b4b 50%, #020617 100%)',
                        'linear-gradient(125deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Efeito de spotlight que segue o mouse */}
            <motion.div
                className="absolute w-64 h-64 bg-white/20 rounded-full blur-3xl"
                animate={{
                    x: mousePosition.x - 128,
                    y: mousePosition.y - 128,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.5,
                }}
            />

            {/* Overlay para dar profundidade */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>
    )
}