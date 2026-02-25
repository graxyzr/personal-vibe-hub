'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function AnimatedBackground() {
    const rawX = useMotionValue(0.5)
    const rawY = useMotionValue(0.5)
    const x = useSpring(rawX, { stiffness: 50, damping: 20 })
    const y = useSpring(rawY, { stiffness: 50, damping: 20 })

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            rawX.set(e.clientX / window.innerWidth)
            rawY.set(e.clientY / window.innerHeight)
        }
        window.addEventListener('mousemove', handle)
        return () => window.removeEventListener('mousemove', handle)
    }, [rawX, rawY])

    const spotX = useTransform(x, v => `${v * 100}%`)
    const spotY = useTransform(y, v => `${v * 100}%`)

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">

            {/* Animated gradient base */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(135deg, #0b0d17 0%, #1a1040 45%, #0d1b2a 100%)',
                        'linear-gradient(135deg, #0f2027 0%, #1a2a3a 45%, #2c3e50 100%)',
                        'linear-gradient(135deg, #130524 0%, #2d1b69 45%, #0d2137 100%)',
                        'linear-gradient(135deg, #0b0d17 0%, #1a1040 45%, #0d1b2a 100%)',
                    ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Ambient orb — amber, top-left */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 700,
                    height: 700,
                    background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    top: '-15%',
                    left: '-10%',
                }}
                animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Ambient orb — violet, bottom-right */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 600,
                    height: 600,
                    background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                    bottom: '-10%',
                    right: '-8%',
                }}
                animate={{ x: [0, -50, 0], y: [0, -35, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />

            {/* Ambient orb — teal, center */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    top: '30%',
                    left: '35%',
                }}
                animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
            />

            {/* Mouse spotlight */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 450,
                    height: 450,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
                    filter: 'blur(2px)',
                    left: spotX,
                    top: spotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Floating particles */}
            {[
                { w: 3, h: 3, l: '12%', t: '18%', dur: '8s', delay: '0s', bg: 'rgba(251,191,36,0.5)' },
                { w: 2, h: 2, l: '78%', t: '12%', dur: '11s', delay: '1.5s', bg: 'rgba(167,139,250,0.5)' },
                { w: 4, h: 4, l: '55%', t: '72%', dur: '7s', delay: '0.8s', bg: 'rgba(255,255,255,0.3)' },
                { w: 2, h: 2, l: '28%', t: '82%', dur: '13s', delay: '2.5s', bg: 'rgba(45,212,191,0.5)' },
                { w: 3, h: 3, l: '88%', t: '50%', dur: '9s', delay: '0.3s', bg: 'rgba(251,191,36,0.4)' },
                { w: 2, h: 2, l: '42%', t: '28%', dur: '10s', delay: '3.5s', bg: 'rgba(167,139,250,0.4)' },
            ].map((p, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        width: p.w,
                        height: p.h,
                        left: p.l,
                        top: p.t,
                        background: p.bg,
                        '--dur': p.dur,
                        '--delay': p.delay,
                    } as React.CSSProperties}
                />
            ))}

            {/* Grain texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px',
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        </div>
    )
}