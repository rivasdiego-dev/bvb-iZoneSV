import Contacts from '@/components/Contacts'
import { Hammersmith_One, Montserrat } from 'next/font/google'
import Image from 'next/image'

const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200','300','400','500','600','700','800','900'] })
const volleyImage = '/logo.png'

export default function Home() {
  return (
    <main>
      {/* IMAGE, TITLE, DESCRIPTION AND EVENTS BUTTON*/}
      <section className='flex flex-col justify-center gap-16 min-h-screen p-2 py-16'>
        {/* IMAGE AND TITLE */}
        <div className='relative'>
          <div className='from-black to-transparent bg-gradient-to-t h-full w-full absolute' />
          <p className={'absolute bottom-0 text-center w-full text-5xl ' + hammerSmith.className}> Beach Volleyball Information Zone </p>
          <Image
            className='m-auto'
            alt=''
            src={volleyImage}
            height={300}
            width={300}
          />
        </div>
        {/* DESCRIPTION */}
        <p className='text-lg text-justify mx-7'>
          This site will keep you updated with the latest information about several beach volleyball events, such as teams playing, the game schedules, results and even standings!
        </p>
        {/* BUTTON */}
        <button className={'mx-auto bg-primary py-3 px-8 text-4xl font-semibold w-fit rounded text-shadow-sm ' + montserrat.className} > Go to events </button>
      </section>

      {/* SPONSORS */}
      <section className='bg-white py-16'>
        <p className='text-black text-xl font-bold text-center'> Thanks to our sponsors! </p>
      </section>

      <Contacts />

    </main>
  )
}
