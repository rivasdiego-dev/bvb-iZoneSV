import Contacts from '@/components/Contacts'
import { Metadata } from 'next'
import { Hammersmith_One, Montserrat } from 'next/font/google'
import Image from 'next/image'

const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const volleyImage = '/logo.png'

export default function Page() {

  return (
    <main>
      Admin
    </main>
  )
}
