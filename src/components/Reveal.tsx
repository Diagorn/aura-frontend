import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../lib/animation'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Плавное появление блока при попадании во вьюпорт */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
