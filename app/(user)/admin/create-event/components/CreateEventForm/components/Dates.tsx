import React from 'react'

type Props = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    inputDefaultForm : string,
}

export default function Dates({ handleInputChange, inputDefaultForm }: Props) {
    return (
        <div className="flex gap-6">
            <div className="w-full">
                <label htmlFor="event-start-date" className="block text-lg font-medium" > Fecha de inicio </label>
                <input
                    name='startDate'
                    onChange={handleInputChange}
                    type="date"
                    placeholder="When is the event starting..."
                    id="event-start-date"
                    className={inputDefaultForm}
                />
            </div>
            <div className="w-full">
                <label htmlFor="event-start-date" className="block text-lg font-medium" > Fecha de finalización </label>
                <input
                    name='endDate'
                    onChange={handleInputChange}
                    type="date"
                    placeholder="When you plan to finish it..."
                    id="event-start-date"
                    className={inputDefaultForm}
                />
            </div>
        </div>

    )
}