'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaRightLong } from 'react-icons/fa6'

type Props = {
    item: string,
    navigateTo: string
}

export default function MenuItem({item, navigateTo}: Props) {
    const router = useRouter()
 
    const navigateHandler = () => {
        router.replace(navigateTo, {scroll:true})
    } 

    return (
        <button onClick={navigateHandler} className='w-full flex justify-between items-center text-2xl mt-5 px-2'>
            {item}
            <FaRightLong />
        </button>
    )
}