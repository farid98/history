import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Historical Timeline — 4000 BCE to Present',
  description:
    'Explore human history from 4000 BCE to the present day at three zoom levels: millennia, 500-year spans, and centuries.',
  keywords: ['history', 'timeline', 'ancient history', 'world history', 'civilization'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#2C2C2C]">
        {children}
      </body>
    </html>
  )
}
