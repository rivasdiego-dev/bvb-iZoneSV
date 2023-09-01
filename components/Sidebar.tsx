"use client"

import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import MenuItem from './Sidebar/MenuItem'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDB } from '@/firebase/app'

interface SidebarProps {
    open: boolean,
    setOpen: (value: boolean) => void
}
const volleyMan = '/volleyManWhite.png'

export default function Sidebar({ open, setOpen }: SidebarProps) {
    const router = useRouter()
    const userID = localStorage.getItem("id");
    let userIsLogged = false;
    const [userAuth, setUserAuth] = useState(false);

    async function verifyUser() {
        try {
            const querySnapshot = await getDocs(collection(firebaseDB, "users"));
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.id === userID) {
                    if (userData.roles.includes("admin"))
                        setUserAuth(true);
                }
            });
        } catch (error) {
            console.error("Couldn't verify user", error);
        }
    }

    if (userID !== null && userID !== undefined) userIsLogged = true;

    let message = userIsLogged ? "Log Out" : "Log In";

    function handleNavigation(): void {
        setOpen(!open)
    }

    const actionButtonHandler = (userLogged: boolean) => {
        userLogged ? router.replace('/') : router.replace('/login')
        localStorage.removeItem('id')
        setUserAuth(false)
        setOpen(!open);
    }

    useEffect(() => {
        verifyUser()
    }, [userIsLogged])


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-neutral-950 bg-opacity-90 transition-all" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-24">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    />
                                    <div className="flex h-full flex-col overflow-y-hidden bg-black py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="">
                                                <Image
                                                    className='m-auto'
                                                    src={volleyMan}
                                                    alt="man-playing"
                                                    width={24}
                                                    height={0}
                                                />
                                            </Dialog.Title>
                                        </div>
                                        <div className="flex flex-col justify-between relative mt-6 flex-1 p-4 sm:px-6">
                                            <div onClick={handleNavigation}>
                                                <MenuItem item='Home' navigateTo='/' />
                                                <MenuItem item='Latest Event' navigateTo='/events/latest' />
                                                <MenuItem item='All events' navigateTo='/events' />
                                                {userAuth && <MenuItem item='Admin' navigateTo='/admin' />}
                                            </div>

                                            <button onClick={() => { actionButtonHandler(userIsLogged) }} className="p-2 place-self-end text-lg font-bold w-fit">
                                                {message}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
