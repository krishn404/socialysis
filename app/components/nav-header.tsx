import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BarChart3, MessageCircle, PieChart } from 'lucide-react'

export function NavHeader() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-lg">Social Analytics</Link>
        <nav className="ml-auto flex gap-2">
          <Link href="/">
            <Button variant="ghost" className="h-8">
              <PieChart className="mr-2 h-4 w-4" />
              Analysis
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="h-8">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/chatbot">
            <Button variant="ghost" className="h-8">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chatbot
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  )
}

