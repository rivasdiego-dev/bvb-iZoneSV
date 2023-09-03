'use client'

import { Place, VolleyEvent } from '@/firebase/interfaces';
import { GetAllPlaces, UpdateEvent, defaultPlace, defaultVolleyEvent } from '@/firebase/services/events';
import useFetchEvents from '@/hooks/useFetchEvents';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaX } from 'react-icons/fa6';

const inputDefaultForm = "text-base tracking-wide rounded block w-full p-2.5 bg-gray-700 focus:outline-none "

export default function Page() {
  const router = useRouter();
  const handleGoBack = () => { router.replace('/admin') };
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedEvent, setSelectedEvent] = useState<VolleyEvent>(defaultVolleyEvent);
  const { volleyEvents } = useFetchEvents();

  const handleSelectEvent = (volleyEvent: VolleyEvent) => {
    setSelectedEvent(volleyEvent);
    setCategoryList(volleyEvent.categories)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UpdateEvent(selectedEvent)
    setSelectedEvent(defaultVolleyEvent);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryList((prevInfo) => [...prevInfo, category])
    setCategory('')
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategoryList((prevInfo) =>
      prevInfo.filter((category) => category !== categoryToRemove)
    );
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedEvent((prevInfo) => selectedEvent ? { ...selectedEvent, [name]: value } : { ...prevInfo, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedEvent((prevInfo) => selectedEvent ? { ...selectedEvent, [name]: value } : { ...prevInfo, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSelectedEvent((prevInfo) => selectedEvent ? { ...selectedEvent, [name]: value } : { ...prevInfo, [name]: value });
  };

  useEffect(() => {
    setSelectedEvent((prevInfo) => ({ ...prevInfo, categories: categoryList }));
  }, [categoryList]);

  useEffect(() => { }, [volleyEvents]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const fetchedPlaces = await GetAllPlaces()
      if (fetchedPlaces)
        setPlaces(() => [defaultPlace, ...fetchedPlaces])
    }
    fetchPlaces()
  }, [])

  return (
    <div className="min-h-full">
      <div className="relative">
        <button onClick={handleGoBack} className="text-3xl absolute top-2 left-3"> <FaArrowLeftLong /> </button>
        <h1 className='text-5xl w-full text-center pb-10 uppercase'> Modify Event </h1>
      </div>
      <div className='flex w-full px-4'>
        <section className='w-full text-xl'>
          List of All Events
          {volleyEvents.map((e, i) => (
            <div onClick={() => { handleSelectEvent(e) }} className='cursor-pointer my-2 bg-secondary rounded py-2 px-4 hover:translate-x-2 transition-all' key={i}> {e.name} </div>
          ))}
        </section>
        <section className='w-full'>
          <form className='w-11/12 mx-auto' onSubmit={handleFormSubmit}>
            <div className="mb-6 grid grid-cols-1 gap-6 items-center">
              <div className=''>
                <label htmlFor="event-name" className="block text-lg font-medium" > Event name </label>
                <input
                  onChange={handleInputChange}
                  name='name'
                  autoComplete='off'
                  type="text"

                  id="event-name"
                  className={inputDefaultForm}
                  value={selectedEvent?.name || ""}
                />
              </div>
              <div className='flex '>
                <input
                  onChange={() => setSelectedEvent((prevEvent) => ({ ...prevEvent, shown: !prevEvent.shown }))}
                  name='name'
                  autoComplete='off'
                  type="checkbox"
                  id="event-shown"
                  className='mr-4'
                  checked={selectedEvent?.shown || false}
                />
                <label htmlFor="event-shown" className="block text-lg font-medium" > Show event </label>
              </div>
              <div>
                <label htmlFor="event-desc" className="block text-lg font-medium" > Event description </label>
                <textarea
                  name='description'
                  onChange={handleTextareaChange}
                  rows={2}
                  id="event-desc"

                  className={inputDefaultForm + " resize-none"}
                  value={selectedEvent?.description || ""}
                />
              </div>
              <div>
                <label htmlFor="event-place" className="block text-lg font-medium" > Event place </label>
                <select name='placeID' onChange={handleSelectChange} id="event-place" className={inputDefaultForm} >
                  {
                    places.map((place, index) => (
                      <option key={index} value={place.id}> {place.name} </option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="event-categories" className="block text-lg font-medium" > Event categories </label>
                <div className='flex flex-col lg:flex-row gap-2 '>
                  <input
                    type="text"
                    value={category}

                    id="event-categories"
                    onChange={handleCategoryInputChange}
                    className={inputDefaultForm}
                  />
                  <button onClick={handleAddCategory} className='bg-secondary-950 rounded px-3 whitespace-nowrap focus:outline-none'> Add Category </button>
                </div>
              </div>
              <div className='h-full xl:row-span-2 row-span-1'>
                <label htmlFor="event-categories" className="block text-lg font-medium" > Current categories </label>
                <div className="flex flex-wrap gap-6 justify-around">
                  {
                    categoryList.map(category => (
                      <div className='relative' key={category}>
                        <div
                          onClick={() => handleRemoveCategory(category)}
                          className="absolute -top-1 -right-2 text-red-500 cursor-pointer"
                        >
                          <FaX />
                        </div>
                        <p className='text-base tracking-wide rounded block p-2.5 bg-gray-700 focus:outline-none'>
                          {category}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full">
                  <label htmlFor="event-start-date" className="block text-lg font-medium" > Event Start Date </label>
                  <input
                    name='startDate'
                    onChange={handleInputChange}
                    type="datetime-local"

                    id="event-start-date"
                    className={inputDefaultForm}
                    value={selectedEvent?.startDate || ""}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="event-end-date" className="block text-lg font-medium" > Event End Date </label>
                  <input
                    name='endDate'
                    onChange={handleInputChange}
                    type="datetime-local"

                    id="event-end-date"
                    className={inputDefaultForm}
                    value={selectedEvent?.endDate || ""}
                  />
                </div>
              </div>
            </div>
            <div className='flex'>
              <button type='submit' className='bg-secondary text-3xl px-12 py-3 rounded mx-auto text-shadow font-bold whitespace-nowrap focus:outline-none'> Update Event </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
