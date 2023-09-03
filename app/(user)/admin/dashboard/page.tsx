'use client'

import { Hammersmith_One, Montserrat, Roboto } from 'next/font/google'
import { useRouter } from 'next/navigation'

const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const roboto = Roboto({ subsets: ["latin-ext"], weight: ["100", "300", "400", "500", "700", "900"] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const volleyImage = '/logo.png'

export default function Page() {
  
  const router = useRouter()

  return (
    <main className=''>
      <h1 className='text-8xl w-full text-center my-28 uppercase'> Admin Dashboard </h1>
      <div className="flex w-full gap-4 justify-center">
        <button onClick={() => {router.replace('/admin/create-event')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Create event </button>
        <button onClick={() => {router.replace('/admin/manage-events')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Manage events </button>
        <button onClick={() => {router.replace('/admin/manage-places')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Manage places </button>
        <button onClick={() => {router.replace('/admin/manage-users')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Manage users </button>
        <button onClick={() => {router.replace('/admin/manage-teams')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Manage teams </button>
        <button onClick={() => {router.replace('/admin/manage-groups')}} className='bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary' > Manage groups </button>
      </div>
    </main>
  )
}