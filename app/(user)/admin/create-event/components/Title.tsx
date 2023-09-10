import { Roboto_Slab } from 'next/font/google'
import React from 'react'

type Props = {
    children: string
}

const roboto = Roboto_Slab({ subsets: ["latin-ext"], weight: ["100", "300", "400", "500", "700", "900"] })


export default function Title({ children }: Props) {
    return (
        <p className={`text-center text-4xl font-bold mb-6 tracking-wider w-fit mx-auto bg-cyan-800 py-2 px-6 rounded-lg text-shadow ${roboto.className}`}>{children}</p>
    )
}