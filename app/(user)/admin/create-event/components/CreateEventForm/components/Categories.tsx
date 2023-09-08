import { VolleyEvent } from '@/firebase/interfaces'
import { Category, defaultCategory } from '@/firebase/types'
import React, { SetStateAction, useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'

type Props = {
    inputDefaultForm: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    setEventInfo: (value: SetStateAction<VolleyEvent>) => void,
}

export default function Categories({ inputDefaultForm, setEventInfo, handleInputChange }: Props) {

    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>(defaultCategory)

    useEffect(() => {
        setEventInfo((prevInfo) => ({ ...prevInfo, categories: categoryList }));
    }, [categoryList]);

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        setCategoryList((prevInfo) => [...prevInfo, category])
        setCategory(defaultCategory)
    }

    const handleRemoveCategory = (categoryToRemove: string) => {
        setCategoryList((prevInfo) =>
            prevInfo.filter((category) => category.name !== categoryToRemove)
        );
    };

    const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
        setCategory((prevInfo) => ({...prevInfo, name: e.target.value}))
      }

    return (
        <>
            <div>
                <label htmlFor="event-categories" className="block text-lg font-medium" > Event categories </label>
                <div className='flex flex-col lg:flex-row gap-2 '>
                    <input
                        type="text"
                        value={category.name}
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
                            <div className='relative' key={category.name}>
                                <div
                                    onClick={() => handleRemoveCategory(category.name)}
                                    className="absolute -top-1 -right-2 text-red-500 cursor-pointer"
                                >
                                    <FaX />
                                </div>
                                <p className='text-base tracking-wide rounded block p-2.5 bg-gray-700 placeholder-gray-400 focus:outline-none'>
                                    {category.name}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}