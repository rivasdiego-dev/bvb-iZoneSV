'use client'
import { Place, VolleyEvent } from "@/firebase/interfaces";
import { GetPlaceByID } from "@/firebase/services/events";
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardSkeleton from './EventCard/CardSkeleton';

interface EventCardProps {
  volleyEvent: VolleyEvent;
}
const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function EventCard({ volleyEvent }: EventCardProps) {

  const [eventPlace, setEventPlace] = useState<Place>();
  const router = useRouter();
  const eventRoute = "/events/" + volleyEvent.name;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const place = await GetPlaceByID(volleyEvent.placeID) as Place;
        setEventPlace(place);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    fetchPlace();
  }, []);

  if (!eventPlace) { return <CardSkeleton /> }

  const handleGoToEvent = () => {
    router.push(eventRoute)
  }

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const day = date.getDate();
    return `${capitalizedMonth} ${day}`;
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow mx-12">
      <img className="rounded-t-lg" src={eventPlace.imageURL} alt={eventPlace.name} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{volleyEvent.name}</h5>
        <p className="font-normal leading-4 text-gray-700">{eventPlace.name}</p>
        <p className="font-normal text-gray-700">{formatDate(volleyEvent.startDate)} - {formatDate(volleyEvent.endDate)}</p>

        <button onClick={handleGoToEvent} className={"mt-5 px-3 py-2 w-full text-2xl font-semibold tracking-wide text-shadow-sm text-center text-white bg-secondary rounded-md transition-all hover:bg-secondary-800 " + montserrat.className}>
          More info
        </button>

      </div>
    </div>
  );
}
