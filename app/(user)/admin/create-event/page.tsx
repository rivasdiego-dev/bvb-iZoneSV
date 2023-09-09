'use client'

import useMultistepForm from '@/hooks/useMultistepForm';
import React, { useState, useEffect } from 'react';
import CreateEventForm from './components/CreateEventForm/CreateEventForm';
import AddTeamsForm from './components/AddTeamsForm/AddTeamsForm';
import CreateGroupsForm from './components/CreateGroupsForm/CreateGroupsForm';

export default function Page() {
    const [eventID, setEventID] = useState('X0q8fDcHBJUdNyuym14I');
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    useEffect(() => {
        setIsNextDisabled(eventID === '');
    }, [eventID]);

    const { step, steps, currentStepIndex, next } = useMultistepForm([
        <CreateEventForm setEventID={setEventID} />,
        <AddTeamsForm eventID={eventID} />,
        <CreateGroupsForm eventID={eventID} />
        
    ]);

    return (
        <div className='w-2/3 border-white border p-8 my-4 mx-auto rounded-lg relative'>
            <form action=''>
                <div className='absolute top-2 right-2'>
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className='flex gap-2 justify-end mt-4'>
                    <button type='button' className={`px-6 text-xl leading-5 py-2 rounded ${currentStepIndex === steps.length - 1 ? 'bg-green-600' : 'bg-secondary-800'} ${isNextDisabled ? 'text-gray-950' : ''} transition-all` } onClick={next} disabled={isNextDisabled}>
                        {currentStepIndex === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </button>
                </div>
            </form>
        </div>
    );
}
