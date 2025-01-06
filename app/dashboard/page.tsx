'use client'

import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Users, Eye, MessageSquare, ChevronUp, ChevronDown, Activity } from 'lucide-react'
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"

const data = [
  { name: 'Jan', value1: 40, value2: 60, engagement: 110 },
  { name: 'Feb', value1: 135, value2: 50, engagement: 155 },
  { name: 'Mar', value1: 60, value2: 180, engagement: 120 },
  { name: 'Apr', value1: 145, value2: 80, engagement: 140 },
  { name: 'May', value1: 25, value2: 90, engagement: 115 },
  { name: 'Jun', value1: 150, value2: 200, engagement: 70 },
]

const engagementData = [
  { month: 'Jan', value: 110 },
  { month: 'Feb', value: 155 },
  { month: 'Mar', value: 120 },
  { month: 'Apr', value: 140 },
  { month: 'May', value: 115 },
  { month: 'Jun', value: 70 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">Track and analyze your social media performance</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Analysis
            </Button>
          </Link>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2"
          >
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Engagement
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          <TabsContent value="overview" className="space-y-6">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatedCard delay={0.1} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center"
                    >
                      <span className="text-2xl font-bold">12,345</span>
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <ChevronUp className="h-4 w-4" />
                        12%
                      </span>
                    </motion.div>
                    <p className="text-xs text-muted-foreground">+2.5k from last month</p>
                  </div>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <Line 
                          type="monotone" 
                          dataKey="value1" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke="#ff6347" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.2} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center"
                    >
                      <span className="text-2xl font-bold">5.6%</span>
                      <span className="ml-2 text-sm text-red-500 flex items-center">
                        <ChevronDown className="h-4 w-4" />
                        0.8%
                      </span>
                    </motion.div>
                    <p className="text-xs text-muted-foreground">-0.2% from last month</p>
                  </div>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <Bar dataKey="value" fill="#1DA1F2" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center"
                    >
                      <span className="text-2xl font-bold">45,678</span>
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <ChevronUp className="h-4 w-4" />
                        8.2%
                      </span>
                    </motion.div>
                    <p className="text-xs text-muted-foreground">+5.2k from last month</p>
                  </div>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value1" 
                          stroke="#4caf50" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interactions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center"
                    >
                      <span className="text-2xl font-bold">125/1,234</span>
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <ChevronUp className="h-4 w-4" />
                        5.3%
                      </span>
                    </motion.div>
                    <p className="text-xs text-muted-foreground">Average comments/likes</p>
                  </div>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <Bar dataKey="value" fill="#1DA1F2" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>

            <AnimatedCard delay={0.5} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle>Engagement Trends</CardTitle>
                    <CardDescription>Track your engagement performance over time</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm text-muted-foreground">Comments</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value1" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                        activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value2" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444' }}
                        activeDot={{ r: 6, fill: '#ef4444' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          <TabsContent value="engagement">
            <AnimatedCard className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="space-y-1">
                  <CardTitle>Detailed Engagement Analysis</CardTitle>
                  <CardDescription>Monthly breakdown of user interactions</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="engagement" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}