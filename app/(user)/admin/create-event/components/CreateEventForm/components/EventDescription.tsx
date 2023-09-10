import React from 'react'

type Props = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    inputDefaultForm : string,
}

export default function EventDescription({ handleInputChange, inputDefaultForm }: Props) {
    return (
        <div>
            <label htmlFor="event-desc" className="block text-lg font-medium" > Descripción del evento </label>
            <textarea
                name='description'
                onChange={handleInputChange}
                rows={4}
                id="event-desc"
                placeholder="Describe what's the event for..."
                className={inputDefaultForm + " resize-none"}
            />
        </div>
    )
}