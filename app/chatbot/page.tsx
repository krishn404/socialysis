'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User } from 'lucide-react'
import { AnimatedCard } from "@/components/ui/animated-card"

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    setIsTyping(true)

    // Assuming handleSubmit is a synchronous function, wrap it in a Promise
    Promise.resolve(handleSubmit(e))
      .finally(() => setIsTyping(false))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500/60">
            AI Assistant
          </h1>
        </motion.div>
        
        <AnimatedCard className="relative  mt-15 backdrop-blur-sm bg-card/95 shadow-xl">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-4 w-5" />
              Social Media Analysis Chatbot
            </CardTitle>
            <CardDescription>Get insights about your social media engagement metrics</CardDescription>
          </CardHeader>
          
          <CardContent className="h-[calc(100vh-20rem)] md:h-[600px] overflow-y-auto p-4 md:p-6">
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map(m => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
                      m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-lg px-4 py-3 max-w-[85%] text-sm md:text-base ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/50 backdrop-blur-sm'
                    }`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex space-x-2 rounded-lg px-4 py-3 bg-muted/50 backdrop-blur-sm">
                      <div className="animate-bounce">●</div>
                      <div className="animate-bounce delay-100">●</div>
                      <div className="animate-bounce delay-200">●</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="border-t p-4 md:p-6">
            <form onSubmit={onSubmit} className="flex w-full mb space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow border-none bg-muted/50 backdrop-blur-sm"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                disabled={isTyping || !input.trim()} 
                className="px-6"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </AnimatedCard>
      </div>
    </div>
  )
}