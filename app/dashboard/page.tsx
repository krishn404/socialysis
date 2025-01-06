'use client'

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
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
    <div className="container mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analysis
          </Button>
        </Link>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="overview" className="space-y-4">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatedCard delay={0.1}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold"
                >
                  12,345
                </motion.div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Line type="monotone" dataKey="value1" stroke="#2563eb" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="value2" stroke="#ef4444" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold"
                >
                  5.6%
                </motion.div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold"
                >
                  45,678
                </motion.div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Line type="monotone" dataKey="value1" stroke="#2563eb" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="value2" stroke="#ef4444" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Comments/Likes</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold"
                >
                  125/1,234
                </motion.div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>

          <AnimatedCard delay={0.5}>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value1" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="value2" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Detailed Engagement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

