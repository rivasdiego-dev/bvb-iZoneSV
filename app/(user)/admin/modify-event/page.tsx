'use client'

import { VolleyEvent } from '@/firebase/interfaces';
import { GetAllEvents } from '@/firebase/services/events';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Page() {
  const router = useRouter();
  const [volleyEvents, setVolleyEvents] = useState<VolleyEvent[]>([])

  async function fetchEvents() {
    const fetchedEvents = await GetAllEvents()
    if (fetchedEvents)
    setVolleyEvents(() => [...fetchedEvents])
  }

  const handleGoBack = () => {
    router.replace('/admin')
  }

  useEffect(() => {
    fetchEvents()
    console.log(volleyEvents);
  }, [])

  return (
    <div className="min-h-full">
      <div className="relative border border-black">
        <button onClick={handleGoBack} className="text-3xl absolute top-2 left-3"> <FaArrowLeftLong /> </button>
        <h1 className='text-5xl w-full text-center my-10 uppercase'> Modify Event </h1>

        <button onClick={() => {console.log(volleyEvents);}}> See Events </button>
        
        {/*  All Events component */}
        {/*  Event Selected  component */}

      </div>
    </div>
  )
}