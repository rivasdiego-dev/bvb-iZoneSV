'use client'

import dynamic from "next/dynamic";
import { Hammersmith_One } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

const volleyMan = '/volleyManWhite.png'
const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const DynamicSidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });



export default function NavBar() {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <nav className="flex justify-between bg-black px-6 py-4">
            <div className="flex items-center gap-6">
                <Image
                    src={volleyMan}
                    alt="man-playing"
                    width={24}
                    height={0}
                />
                <h1 className={'text-3xl ' + hammerSmith.className} >BVB iZoneSV</h1>
            </div>
            <div className="cursor-pointer" onClick={toggleSidebar}> <FaBars className='text-3xl' /> </div>
            <DynamicSidebar open={open} setOpen={setOpen}/>
        </nav>
    )
}