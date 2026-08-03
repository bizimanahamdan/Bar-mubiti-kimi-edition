import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bar Mubiti | A Taste of Kigali's Grill Scene',
  description: 'Bar Mubiti is Kigali's premier bar and grill. Experience authentic Rwandan cuisine, grilled specialties, and vibrant nightlife.',
  keywords: 'bar mubiti, kigali bar, rwanda grill, kigali nightlife, rwandan cuisine',
  openGraph: {
    title: 'Bar Mubiti | A Taste of Kigali's Grill Scene',
    description: 'Kigali's premier bar and grill. Grilled specialties, drinks, and vibrant atmosphere.',
    type: 'website',
    locale: 'en_RW',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-dark-950 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
