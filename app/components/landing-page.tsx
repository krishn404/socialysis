'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart2, Sparkles, TrendingUp, Instagram, Linkedin, Twitter, MessageCircle, Bot, Database, Code2, Palette, ArrowUpRight, FileCode, PieChart, LineChart, BarChart, Github, Users } from 'lucide-react'
import { useState, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const features = [
    { 
      icon: BarChart2, 
      title: "Real-time Analysis", 
      description: "Get instant insights on your social media engagement metrics across platforms" 
    },
    { 
      icon: Instagram, 
      title: "Multi-platform Support", 
      description: "Comprehensive analysis for Instagram, LinkedIn, and Twitter in one place" 
    },
    { 
      icon: TrendingUp, 
      title: "Interactive Visualizations", 
      description: "Dynamic charts and visualizations for better data understanding" 
    }
  ]

  const techStack = [
    { 
      icon: Code2, 
      name: "React", 
      type: "Frontend",
      description: "Component-based UI library"
    },
    { 
      icon: Palette, 
      name: "Tailwind", 
      type: "Frontend",
      description: "Utility-first CSS framework"
    },
    { 
      icon: ArrowUpRight, 
      name: "Next.js", 
      type: "Frontend",
      description: "React framework used for production"
    },
    { 
      icon: FileCode, 
      name: "TypeScript", 
      type: "Frontend",
      description: "Strongly typed JavaScript for better code quality and development"
    },
    { 
      icon: Bot, 
      name: "Langflow", 
      type: "AI Integration",
      description: "Langflow for workflow creation and GPT integration."
    },
    { 
      icon: Database, 
      name: "DataStax", 
      type: "Tools",
      description: "DataStax Astra DB for performing and storing database operations."
    }
  ]



  return (
    <div ref={targetRef} className="min-h-screen text-white overflow-hidden bg-black lg:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-purple-950 to-black bg-blend-multiply">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <nav className="flex justify-between items-center mb-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">Socialysis</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
        
            </motion.div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Level Supermind Hackathon{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Pre-Assignment
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                A powerful social media engagement analysis tool that helps you understand and optimize your social media performance across various platforms.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <Button 
                  size="lg"
                  onClick={onStart}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8"
                >
                  Start Analysis
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                className="relative bg-gradient-to-br from-purple-900/50 to-black/50 rounded-2xl p-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-gray-900 rounded-2xl p-4">
                  <img 
                    src="/preview.png" 
                    alt="Analytics Dashboard Preview"
                    className="rounded-lg w-full"
                  />
                </div>
              </motion.div>
              <div className="absolute -z-10 inset-0 bg-purple-500/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
               Features
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {features.map((feature, index) => {
              const divRef = useRef<HTMLDivElement>(null);
              const [position, setPosition] = useState({ x: 0, y: 0 });
              const [opacity, setOpacity] = useState(0);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!divRef.current) return;

                const div = divRef.current;
                const rect = div.getBoundingClientRect();
                setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              };

              return (
                <motion.div
                  key={index}
                  ref={divRef}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setOpacity(1)}
                  onMouseLeave={() => setOpacity(0)}
                  className="relative rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent p-[1px]"
                >
                  <div className="relative rounded-2xl p-6 h-full bg-gray-900/60">
                    <div
                      className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-2xl"
                      style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
                      }}
                    />
                    <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>



      {/* Tech Stack Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              🚀 Tech Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent p-[1px] h-full"
              >
                <div className="bg-gray-900/60 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-4">
                    <tech.icon className="h-8 w-8 text-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">{tech.name}</h3>
                      <p className="text-sm text-purple-400">{tech.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm flex-grow">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Project Section */}
      <div className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About the Project
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-3xl mx-auto">
              This project was developed as part of the Pre-Hackathon assignment for the Level Supermind Hackathon. 
              The goal was to create a basic analytics module to analyze engagement data from mock social media using Langflow and DataStax Astra DB.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                size="lg"
                onClick={onStart}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6"
              >
                Try Socialysis Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">Socialysis</span>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50 transition-all flex items-center gap-2 rounded-lg"
                  >
                    <Users className="h-5 w-5" />
                    <span className="hidden sm:inline">Team Members</span>
                    <span className="sm:hidden">Team</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 bg-gray-900/95 backdrop-blur-sm border border-purple-500/50 p-4 rounded-xl shadow-xl">
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Janhvi Babani", github: "janhvibabani" },
                      { name: "Krishna kant", github: "krishn404" },
                      { name: "Arnav Singh", github: "astra1503" },
                      { name: "Abhay Chauhan", github: "thoughtlessnerd" }
                    ].map((member, index) => (
                      <a 
                        key={index}
                        href={`https://github.com/${member.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-900/30 text-purple-300 hover:text-purple-200 transition-all"
                      >
                        <Github className="h-4 w-4" />
                        <span>{member.name}</span>
                      </a>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <a 
                href="https://github.com/krishn404/socialysis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50 p-2 rounded-lg transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

