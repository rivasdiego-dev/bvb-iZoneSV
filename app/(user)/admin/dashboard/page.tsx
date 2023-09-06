'use client'

import { Hammersmith_One, Montserrat, Roboto } from 'next/font/google'
import { useRouter } from 'next/navigation'

const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const roboto = Roboto({ subsets: ["latin-ext"], weight: ["100", "300", "400", "500", "700", "900"] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const volleyImage = '/logo.png'

export default function Page() {
  
  const router = useRouter();
  const btnStyle = 'bg-secondary-900 p-2 rounded transition-all hover:scale-110 hover:bg-secondary'

  return (
    <main className=''>
      <h1 className='text-8xl w-full text-center my-28 uppercase'> Admin Dashboard </h1>
      <div className="flex w-full gap-4 justify-center">
        <button onClick={() => {router.replace('/admin/create-event')}} className={btnStyle} > Create event </button>
        <button onClick={() => {router.replace('/admin/manage-event')}} className={btnStyle} > Manage events </button>
        <button onClick={() => {router.replace('/admin/manage-places')}} className={btnStyle} > Manage places </button>
        <button onClick={() => {router.replace('/admin/manage-users')}} className={btnStyle} > Manage users </button>
      </div>
    </main>
  )
}