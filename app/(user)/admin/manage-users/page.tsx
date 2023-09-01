'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Page() {
  const router = useRouter();
  const handleGoBack = () => { router.replace('/admin') };

  return (
    <div className="min-h-full">
      <div className="relative border border-black">
        <button onClick={handleGoBack} className="text-3xl absolute top-2 left-3"> <FaArrowLeftLong /> </button>
        <h1 className='text-5xl w-full text-center my-10 uppercase'> Manage Users </h1>

        {/* List of users */}

      </div>
    </div>
  )
}