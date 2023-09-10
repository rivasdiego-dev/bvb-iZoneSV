import React from 'react'

type Props = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    inputDefaultForm: string,
}

export default function EventName({ handleInputChange, inputDefaultForm }: Props) {
    return (
        <div className='col-span-2'>
            <label htmlFor="event-name" className="block text-lg font-medium" > Nombre del evento </label>
            <input
                onChange={handleInputChange}
                name='name'
                autoComplete='off'
                type="text"
                placeholder="Give your event a name..."
                id="event-name"
                className={inputDefaultForm}
            />
        </div>
    )
}