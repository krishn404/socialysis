import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { NavHeader } from './components/nav-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Media Engagement Analysis',
  description: 'Analyze engagement across various social media platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavHeader />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

