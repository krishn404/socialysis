'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import AnalysisResults from './components/analysis-results'
import { Instagram, Linkedin, Twitter, BarChart3, Image, Film, Images, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Chat from "@/app/components/chat"
import LandingPage from "@/app/components/landing-page"

export default function Home() {
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [shares, setShares] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedPostType, setSelectedPostType] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisCompleted, setAnalysisCompleted] = useState(false)
  const [showLandingPage, setShowLandingPage] = useState(true)

  const handleAnalyzeClick = async () => {
    setShowLandingPage(false)
    if (!selectedPlatform || !selectedPostType || !selectedGenre || !selectedRegion) return

    setIsAnalyzing(true)
    const newLikes = Math.floor(Math.random() * 10000)
    const newComments = Math.floor(Math.random() * 1000)
    const newShares = Math.floor(Math.random() * 500)

    await new Promise(resolve => setTimeout(resolve, 1000))

    animateToValue(setLikes, newLikes, 1500)
    animateToValue(setComments, newComments, 1500)
    animateToValue(setShares, newShares, 1500)
    setIsAnalyzing(false)
    setAnalysisCompleted(true)

    // Send data to backend
    const payload = {
      platform: selectedPlatform,
      postType: selectedPostType,
      genre: selectedGenre,
      region: selectedRegion,
    }
    console.log("Sending payload to backend:", payload)
    // Replace with your backend API call
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

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'twitter', label: 'Twitter', icon: Twitter }
  ]

  const postTypes = [
    { value: 'static', label: 'Static Image', icon: Image },
    { value: 'reel', label: 'Reel', icon: Film },
    { value: 'carousel', label: 'Carousel', icon: Images }
  ]

  const genres = [
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'nature', label: 'Nature' },
    { value: 'tech', label: 'Tech' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'education', label: 'Education' }
  ]

  const regions = [
    { value: 'usa', label: 'USA' },
    { value: 'india', label: 'India' },
    { value: 'canada', label: 'Canada' },
    { value: 'germany', label: 'Germany' },
    { value: 'australia', label: 'Australia' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted">
      {showLandingPage ? (
        <LandingPage onStart={handleAnalyzeClick} />
      ) : (
        <>
          <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col gap-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="inline-block">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary/10 rounded-full p-3 mb-4"
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Social Media Analysis
              </h1>
              <p className="text-muted-foreground text-lg">
                Get detailed insights into your social media performance
              </p>
            </motion.div>

            <AnimatedCard className="backdrop-blur-sm bg-card/95 shadow-xl border">
              <CardHeader className="border-b px-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Analysis Parameters</CardTitle>
                    <CardDescription>Configure your analysis settings</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
                    <label className="text-sm font-medium">Platform</label>
                    <Select onValueChange={setSelectedPlatform} value={selectedPlatform}>
                      <SelectTrigger className="w-full bg-muted/50 backdrop-blur-sm h-11">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map(({ value, label, icon: Icon }) => (
                          <SelectItem key={value} value={value} className="flex items-center gap-2 h-11">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Icon className="h-4 w-4" />
                              {label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
                    <label className="text-sm font-medium">Post Type</label>
                    <Select onValueChange={setSelectedPostType} value={selectedPostType}>
                      <SelectTrigger className="w-full bg-muted/50 backdrop-blur-sm h-11">
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        {postTypes.map(({ value, label }) => (
                          <SelectItem key={value} value={value} className="flex items-center gap-2 h-11">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
                    <label className="text-sm font-medium">Genre</label>
                    <Select onValueChange={setSelectedGenre} value={selectedGenre}>
                      <SelectTrigger className="w-full bg-muted/50 backdrop-blur-sm h-11">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map(({ value, label }) => (
                          <SelectItem key={value} value={value} className="h-11">{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
                    <label className="text-sm font-medium">Region</label>
                    <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                      <SelectTrigger className="w-full bg-muted/50 backdrop-blur-sm h-11">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(({ value, label }) => (
                          <SelectItem key={value} value={value} className="h-11">{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    className="w-full h-11 relative group"
                    onClick={handleAnalyzeClick}
                    disabled={!selectedPlatform || !selectedPostType || isAnalyzing}
                    variant={isAnalyzing ? "outline" : "default"}
                  >
                    <AnimatePresence mode="wait">
                      {isAnalyzing ? (
                        <motion.div
                          key="analyzing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span>Processing Analysis...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="analyze"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Analyze Performance</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </CardContent>
            </AnimatedCard>

            <AnimatePresence mode="wait">
              {(likes > 0 || comments > 0 || shares > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 }}
                >
                  <AnalysisResults
                    likes={likes}
                    comments={comments}
                    shares={shares}
                    platform={selectedPlatform}
                    postType={selectedPostType}
                    region={selectedRegion}
                    genre={selectedGenre}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {analysisCompleted && <Chat platform={selectedPlatform} postType={selectedPostType} region={selectedRegion} genre={selectedGenre} />}

          </div>
        </>
      )}
    </div>
  )
}     