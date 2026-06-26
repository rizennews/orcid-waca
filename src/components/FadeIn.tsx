'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  duration?: number
  viewportAmount?: number | 'some' | 'all'
  fullWidth?: boolean
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.5,
  viewportAmount = 0.1,
  fullWidth = false,
}: FadeInProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 20, opacity: 0 }
      case 'down':
        return { y: -20, opacity: 0 }
      case 'left':
        return { x: 20, opacity: 0 }
      case 'right':
        return { x: -20, opacity: 0 }
    }
  }

  const getAnimateTarget = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      initial={getInitialOffset()}
      whileInView={getAnimateTarget()}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
