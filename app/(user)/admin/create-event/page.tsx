'use client'

import useMultistepForm from '@/hooks/useMultistepForm'
import React, { useState } from 'react'
import CreateEventForm from './components/CreateEventForm/CreateEventForm'

export default function Page() {

    const [eventID, setEventID] = useState('')

    const { step, steps, currentStepIndex, next, back } = useMultistepForm([
        <CreateEventForm />,
        <div>tow</div>,
        <div>tri</div>,
        <div>for</div>,
    ])
 
  return (
    <div className='w-2/3 border-white border p-8 my-4 mx-auto rounded-lg relative'>
        <form action="">
            <div className="absolute top-2 right-2">
                {currentStepIndex + 1 } / {steps.length}
            </div>
            {step}
            <div className='flex gap-2 justify-end mt-4'>
                {currentStepIndex !== 0 && <button type='button' onClick={back}> Back </button>}
                <button type='button' onClick={next}> {currentStepIndex === steps.length - 1 ?  'Finish' : 'Next'} </button>
            </div>
        </form>
    </div>
  )
}