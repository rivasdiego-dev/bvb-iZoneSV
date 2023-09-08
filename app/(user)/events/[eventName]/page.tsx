'use client'

import Contacts from '@/components/Contacts';
import { Place, VolleyEvent } from '@/firebase/interfaces';
import { GetEventByName, GetPlaceByID } from '@/firebase/services/events';
import { Montserrat, Roboto } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { FaCalendarDays, FaMapLocationDot } from 'react-icons/fa6';

const roboto = Roboto({ subsets: ['latin-ext'], weight: ['100', '300', '400', '500', '700', '900'] })
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })


export default function Page({ params }: { params: { eventName: string } }) {


    const [eventPlace, setEventPlace] = useState<Place>();
    const [volleyEvent, setVolleyEvent] = useState<VolleyEvent | null>();
    const router = useRouter();

    const formatDate = (inputDate: string) => {
        const date = new Date(inputDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        const day = date.getDate();
        return `${capitalizedMonth} ${day}`;
    };

    const redirectToCategory = (category: string) => { router.push(`/events/${params.eventName}/${category}`) }

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const volleyEvent = await GetEventByName(decodeURIComponent(params.eventName));
                setVolleyEvent(volleyEvent);
                const place = await GetPlaceByID(volleyEvent?.placeID) as Place;
                setEventPlace(place);
            } catch (error) {
                console.error("Error fetching place:", error);
            }
        };

        fetchPlace();
    }, [volleyEvent]);

    if (!eventPlace) {
        return <LoadingSkeleton />;
    }

    return (
        <div className='min-h-full'>
            {/* Header Image */}
            <div className="relative">
                <img className="w-screen" src={eventPlace?.imageURL} alt={eventPlace?.name} />
                {volleyEvent && (
                    <h5 className={"w-11/12 absolute bottom-6 right-0 bg-primary px-6 py-2 text-3xl font-semibold text-shadow " + montserrat.className}>
                        {volleyEvent.name}
                    </h5>
                )}
            </div>

            {/* Event Info */}
            <div className="bg-white text-black py-2">
                {volleyEvent && (
                    <>
                        <p className={'text-lg p-2 font-medium ' + roboto.className}>{volleyEvent.description}</p>
                        <InfoItem icon={<FaMapLocationDot className='text-6xl text-secondary-300' />} label="Place" value={eventPlace?.name} />
                        <InfoItem icon={<FaCalendarDays className='text-6xl text-secondary-300' />} label="Dates" value={`From ${formatDate(volleyEvent.startDate)} to ${formatDate(volleyEvent.endDate)}`} />
                    </>
                )}
            </div>

            <div className="flex flex-col gap-8 my-12">
                {
                    volleyEvent?.categories.map((c, i) => (
                        <div className='' key={i}>
                            <h5 onClick={() => {redirectToCategory(c.name)}} className={"w-11/12 bg-secondary hover:bg-secondary-900 transition-all px-6 py-2 text-3xl font-semibold text-shadow rounded-r-lg " + montserrat.className}>
                                {c.name}
                            </h5>
                        </div>
                    ))
                }
            </div>
            <Contacts />
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div role="status" className="px-16 pt-24 animate-pulse">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4 space-x-3">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

function InfoItem({ icon, label, value }: { icon: JSX.Element, label: string, value: string | undefined }) {
    return (
        <div className="flex px-4 py-3">
            <div className="flex items-center">
                {icon}
                <div className="ml-5">
                    <p className='font-bold text-xl'>{label}</p>
                    <p className='ml-2'>{value}</p>
                </div>
            </div>
        </div>
    );
}