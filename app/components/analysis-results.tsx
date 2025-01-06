'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface AnalysisResultsProps {
  likes: number;
  comments: number;
  shares: number;
}

export default function AnalysisResults({ likes, comments, shares }: AnalysisResultsProps) {
  const [currentLikes, setLikes] = useState(likes)
  const [currentComments, setComments] = useState(comments)
  const [currentShares, setShares] = useState(shares)

  const animateToValue = (setter: React.Dispatch<React.SetStateAction<number>>, finalValue: number, duration: number) => {
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setter(Math.floor(progress * finalValue))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  useEffect(() => {
    animateToValue(setLikes, likes, 200)
    animateToValue(setComments, comments, 200)
    animateToValue(setShares, shares, 200)
  }, [likes, comments, shares])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Engagement metrics for the selected platform and post type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            <motion.div
              key="likes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-primary/10 p-4 rounded-lg"
            >
              <h3 className="font-semibold">Likes</h3>
              <p className="text-2xl">{currentLikes.toLocaleString()}</p>
            </motion.div>
            <motion.div
              key="comments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="bg-primary/10 p-4 rounded-lg"
            >
              <h3 className="font-semibold">Comments</h3>
              <p className="text-2xl">{currentComments.toLocaleString()}</p>
            </motion.div>
            <motion.div
              key="shares"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 p-4 rounded-lg"
            >
              <h3 className="font-semibold">Shares</h3>
              <p className="text-2xl">{currentShares.toLocaleString()}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

