'use client'

import { VolleyEvent } from '@/firebase/interfaces'
import { CreateNewEvent, defaultVolleyEvent } from '@/firebase/services/events'
import { useState } from 'react'
import Categories from './components/Categories'
import SelectPlace from './components/SelectPlace'
import Dates from './components/Dates'
import EventDescription from './components/EventDescription'
import EventName from './components/EventName'
import Title from '../Title'

const inputDefaultForm = "text-base tracking-wide rounded block w-full p-2.5 bg-gray-700 placeholder-gray-400 focus:outline-none "

type Props = {
    setEventID: React.Dispatch<React.SetStateAction<string>>
}

export default function CreateEventForm({ setEventID }: Props) {

    const [eventInfo, setEventInfo] = useState<VolleyEvent>(defaultVolleyEvent)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEventInfo((prevInfo) => ({ ...prevInfo, shown: false }))
        console.log(eventInfo);
        CreateNewEvent(eventInfo).then((id) => {
            setEventID(id)
            console.log({ CreateEventLog: id })
        })
    };

    return (
        <>

            <Title> Información del evento </Title>

            <div className="mb-6 grid grid-cols-2 gap-6 items-center">

                <EventName handleInputChange={handleInputChange} inputDefaultForm={inputDefaultForm} />

                <EventDescription handleInputChange={handleInputChange} inputDefaultForm={inputDefaultForm} />

                <Categories inputDefaultForm={inputDefaultForm} setEventInfo={setEventInfo} />

                <SelectPlace handleInputChange={handleInputChange} inputDefaultForm={inputDefaultForm} />

                <Dates handleInputChange={handleInputChange} inputDefaultForm={inputDefaultForm} />
            </div>

            <div className='flex'>
                <button onClick={handleFormSubmit} type='button' className='bg-primary text-3xl mt-20 px-12 py-3 rounded mx-auto text-shadow font-bold whitespace-nowrap focus:outline-none'> Crear Evento! </button>
            </div>

        </>
    )
}