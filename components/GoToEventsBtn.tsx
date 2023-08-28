'use client'

import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React from 'react'

const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200','300','400','500','600','700','800','900'] })
type Props = {}

export default function GoToEventsBtn({ }: Props) {
    const router = useRouter()
    return (
        <button onClick={() => {router.replace('/events')}} className={'mx-auto bg-primary py-3 px-8 text-4xl font-semibold w-fit rounded text-shadow-sm ' + montserrat.className} > Go to events </button>
    )
}