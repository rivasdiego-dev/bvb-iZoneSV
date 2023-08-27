import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import MenuItem from './Sidebar/MenuItem'

interface SidebarProps {
    open: boolean,
    setOpen: (value: boolean) => void
}
const volleyMan = '/volleyManWhite.png'

export default function Sidebar({ open, setOpen }: SidebarProps) {
    const router = useRouter()

    function handleNavigation(): void {
        setOpen(!open)
    }

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
                                                <MenuItem item='Latest Event' navigateTo='/events' />
                                                <MenuItem item='All events' navigateTo='/events' />
                                            </div>

                                            <button onClick={() => {router.replace('/login'); setOpen(!open);}} className="p-2 place-self-end text-lg font-bold w-fit">
                                                Log In
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
