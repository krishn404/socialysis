'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import AnalysisResults from './components/analysis-results'
import { useState } from 'react'

export default function Home() {
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [shares, setShares] = useState(0)

  const handleAnalyzeClick = () => {
    const newLikes = Math.floor(Math.random() * 10000)
    const newComments = Math.floor(Math.random() * 1000)
    const newShares = Math.floor(Math.random() * 500)

    animateToValue(setLikes, newLikes, 1500)
    animateToValue(setComments, newComments, 1500)
    animateToValue(setShares, newShares, 1500)
  }

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

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Social Media Analysis
        </motion.h1>
        
        <AnimatedCard>
          <CardHeader>
            <CardTitle>Analysis Parameters</CardTitle>
            <CardDescription>Select the platform and post type for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium mb-1">Platform</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-1">Post Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Static Image</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button className="w-full" onClick={handleAnalyzeClick}>Analyze</Button>
            </motion.div>
          </CardContent>
        </AnimatedCard>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnalysisResults likes={likes} comments={comments} shares={shares} />
        </motion.div>
      </div>
    </div>
  )
}

