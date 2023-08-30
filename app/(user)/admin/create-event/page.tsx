'use client'

import { useEffect, useState, } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeftLong, FaX } from 'react-icons/fa6'
import { CreateNewEvent, GetAllPlaces, defaultPlace, defaultVolleyEvent } from '@/firebase/services/events';
import { Place, VolleyEvent } from '@/firebase/interfaces';

export default function Page() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [eventInfo, setEventInfo] = useState<VolleyEvent>(defaultVolleyEvent)

  const handleGoBack = () => {
    router.replace('/admin')
  }

  async function fetchPlaces() {
    const fetchedPlaces = await GetAllPlaces()
    if (fetchedPlaces)
      setPlaces(() => [defaultPlace, ...fetchedPlaces])
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEventInfo((prevInfo) => ({ ...prevInfo, shown: false }))
    CreateNewEvent(eventInfo)
    router.replace('/admin')
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
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };


  useEffect(() => {
    fetchPlaces()
  }, [])

  useEffect(() => {
    setEventInfo((prevInfo) => ({ ...prevInfo, categories: categoryList }));
  }, [categoryList]);

  const inputDefaultForm = "text-base tracking-wide rounded block w-full p-2.5 bg-gray-700 placeholder-gray-400 focus:outline-none "

  return (
    <div className="min-h-full">
      <div className="relative border border-black">
        <button onClick={handleGoBack} className="text-3xl absolute top-2 left-3"> <FaArrowLeftLong /> </button>
        <h1 className='text-5xl w-full text-center my-10 uppercase'> Create Event </h1>

        <form className='w-3/4 lg:w-1/2 mx-auto' onSubmit={handleFormSubmit}>

          <div className="mb-6 grid grid-cols-2 gap-6 items-center">

            <div className='col-span-2'>
              <label htmlFor="event-name" className="block text-lg font-medium" > Event name </label>
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

            <div>
              <label htmlFor="event-desc" className="block text-lg font-medium" > Event description </label>
              <textarea
                name='description'
                onChange={handleTextareaChange}
                rows={4}
                id="event-desc"
                placeholder="Describe what's the event for..."
                className={inputDefaultForm + " resize-none"}
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
                  placeholder="Add categories to your event..."
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
                      <p className='text-base tracking-wide rounded block p-2.5 bg-gray-700 placeholder-gray-400 focus:outline-none'>
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
                  placeholder="When is the event starting..."
                  id="event-start-date"
                  className={inputDefaultForm}
                />
              </div>
              <div className="w-full">
                <label htmlFor="event-start-date" className="block text-lg font-medium" > Event Start Date </label>
                <input
                  name='endDate'
                  onChange={handleInputChange}
                  type="datetime-local"
                  placeholder="When you plan to finish it..."
                  id="event-start-date"
                  className={inputDefaultForm}
                />
              </div>
            </div>

          </div>

          <div className='flex'>
            <button type='submit' className='bg-primary text-3xl mt-20 px-12 py-3 rounded mx-auto text-shadow font-bold whitespace-nowrap focus:outline-none'> Create Event </button>
          </div>

        </form>

      </div>
    </div>
  )
}