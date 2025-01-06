import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BarChart3, MessageCircle, PieChart } from 'lucide-react'

export function NavHeader() {
  return (
    <div className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md backdrop-saturate-150" />
      <div className="border-b relative">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="md:block">
            <Link href="/" className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Socialysis
            </Link>
          </div>
          <nav className="ml-auto flex gap-1 md:gap-2">
            <Link href="/">
              <Button variant="ghost" className="h-8 hover:bg-white/10 dark:hover:bg-gray-800/50">
                <PieChart className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Analysis</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="h-8 hover:bg-white/10 dark:hover:bg-gray-800/50">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button variant="ghost" className="h-8 hover:bg-white/10 dark:hover:bg-gray-800/50">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Chatbot</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}