import NavBar from '@/components/NavBar'
import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Condensed({ subsets: ['latin-ext'], weight: ['300', '400', '700'] })

export const metadata: Metadata = {
  title: 'iZoneSV',
  description: 'Beach Volleyball Information Zone',
  icons: '/logo.ico',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'h-screen flex flex-col ' + roboto.className}>
        <NavBar />
        <div className='h-full overflow-y-auto'>
          {children}
        </div>
      </body>
    </html>
  )
}
