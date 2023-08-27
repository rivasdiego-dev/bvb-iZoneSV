import { } from 'react'
import { GrFacebook } from "react-icons/gr";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa6";



export default function Contacts() {
    return (
        <footer className='p-5'>
            
            <div className='flex items-center'>
                <div className='w-full h-0 border' />
                <p className='w-full text-lg text-center'> Contact Trucko </p>
                <div className='w-full h-0 border' />
            </div>

            <div className='flex w-full justify-evenly items-center py-4'>
                <GrFacebook className='text-5xl' />
                <FaInstagram className='text-6xl' />
                <FaWhatsapp className='text-6xl' />
                <FaTiktok className='text-5xl' />
            </div>

        </footer>
    )
}