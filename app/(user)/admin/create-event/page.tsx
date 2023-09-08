'use client'

import useMultistepForm from '@/hooks/useMultistepForm';
import React, { useState, useEffect } from 'react';
import CreateEventForm from './components/CreateEventForm/CreateEventForm';
import AddTeamsForm from './components/AddTeamsForm/AddTeamsForm';

export default function Page() {
    const [eventID, setEventID] = useState('');
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    useEffect(() => {
        setIsNextDisabled(eventID === '');
    }, [eventID]);

    const { step, steps, currentStepIndex, next } = useMultistepForm([
        <CreateEventForm setEventID={setEventID} />,
        <AddTeamsForm eventID={eventID} />,
        <div>tri</div>,
        <div>for</div>,
    ]);

    return (
        <div className='w-2/3 border-white border p-8 my-4 mx-auto rounded-lg relative'>
            <form action=''>
                <div className='absolute top-2 right-2'>
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className='flex gap-2 justify-end mt-4'>
                    <button type='button' onClick={next} disabled={isNextDisabled}>
                        {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
}
