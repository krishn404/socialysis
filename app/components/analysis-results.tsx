'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import type { AnalysisData } from '@/lib/types'
import Chat from "@/app/components/chat";

// Define the props type
interface AnalysisResultsProps {
  likes: number;
  comments: number;
  shares: number;
  platform: string;
  postType: string;
  region: string;
  genre: string;
}

export default function AnalysisResults({ likes, comments, shares, platform, postType, region, genre }: AnalysisResultsProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLikes, setLikes] = useState(0);
  const [currentComments, setComments] = useState(0);
  const [currentShares, setShares] = useState(0);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/analysis');
      const json = await response.json();
      
      if (json.error) {
        throw new Error(json.error);
      }

      setData(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setLikes(data.likes || 0);
      setComments(data.comments || 0);
      setShares(data.shares || 0);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      animateToValue(setLikes, data.likes || 0, 200);
      animateToValue(setComments, data.comments || 0, 200);
      animateToValue(setShares, data.shares || 0, 200);
    }
  }, [data]);

  useEffect(() => {
    // Set current likes, comments, and shares from props
    setLikes(likes);
    setComments(comments);
    setShares(shares);
  }, [likes, comments, shares]);

  const handleAnalyzeComplete = () => {
    setAnalysisCompleted(true);
  };

  if (loading) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-muted-foreground">
              {retryCount > 0 ? `Retry attempt ${retryCount}...` : 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-32">
            <div className="text-red-500 mb-4 text-center">{error}</div>
            <button 
              onClick={() => {
                setRetryCount(prev => prev + 1);
                fetchData();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={loading}
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="text-center">No data available</div>
        </CardContent>
      </Card>
    );
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
    <>
      {loading || error || !data ? (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-muted-foreground">
                {retryCount > 0 ? `Retry attempt ${retryCount}...` : 'Loading...'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Engagement metrics for {platform} - {postType}
            </CardDescription>
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
      )}
      {analysisCompleted && <Chat platform={platform} postType={postType} region={region} genre={genre} />}
    </>
  )
}