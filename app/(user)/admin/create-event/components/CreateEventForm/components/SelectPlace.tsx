import { Place } from '@/firebase/interfaces'
import { GetAllPlaces, defaultPlace } from '@/firebase/services/events'
import { useEffect, useState } from 'react'

type Props = {
    inputDefaultForm: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}


export default function SelectPlace({ inputDefaultForm, handleInputChange }: Props) {

    const [places, setPlaces] = useState<Place[]>([])

    useEffect(() => {
        const fetchPlaces = async () => {
            const fetchedPlaces = await GetAllPlaces()
            if (fetchedPlaces)
                setPlaces(() => [defaultPlace, ...fetchedPlaces])
        }

        fetchPlaces()
    }, [])

    return (
        <>
            <div>
                <label htmlFor="event-place" className="block text-lg font-medium" > Lugar del evento </label>
                <select name='placeID' onChange={handleInputChange} id="event-place" className={inputDefaultForm} >
                    {
                        places.map((place, index) => (
                            <option key={index} value={place.id}> {place.name} </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}
