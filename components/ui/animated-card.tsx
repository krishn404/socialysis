"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function AnimatedCard({ children, className, delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={className}>
        {children}
      </Card>
    </motion.div>
  )
}

