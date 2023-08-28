'use client'

import { Hammersmith_One, Montserrat } from 'next/font/google'
import { useRouter } from 'next/navigation'

const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const volleyImage = '/logo.png'

export default function Page() {
  
  const router = useRouter()

  return (
    <main className=''>
      <h1 className='text-8xl w-full text-center my-28 uppercase'> Admin Dashboard </h1>
      <div className="flex w-full gap-4">
        <button onClick={() => {router.replace('/admin/create-event')}} className='bg-secondary-900 p-2 rounded grow' > Create event </button>
        <button onClick={() => {router.replace('/admin/')}} className='bg-secondary-900 p-2 rounded grow' > Modify event </button>
        <button onClick={() => {router.replace('/admin/')}} className='bg-secondary-900 p-2 rounded grow' > Manage places </button>
        <button onClick={() => {router.replace('/admin/')}} className='bg-secondary-900 p-2 rounded grow' > Manage users </button>
      </div>
    </main>
  )
}