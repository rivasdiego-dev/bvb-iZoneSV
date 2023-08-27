import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Condensed, Hammersmith_One, Montserrat } from 'next/font/google'

const roboto = Roboto_Condensed({subsets: ['latin'], weight: ['300','400','700']})

export const metadata: Metadata = {
  title: 'iZoneSV',
  description: 'Beach Volleyball Information Zone',
  icons: '/logo.ico',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {  
  return (
    <html lang="en">      
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
