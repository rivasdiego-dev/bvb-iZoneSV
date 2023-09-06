'use client'
import { Team, VolleyEvent } from '@/firebase/interfaces';
import { defaultVolleyEvent } from '@/firebase/services/events';
import { CreateNewTeam, defaultTeam } from '@/firebase/services/teams';
import useFetchEvents from '@/hooks/useFetchEvents';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

type Props = {}

export default function page({ }: Props) {
    const router = useRouter();
    const { volleyEvents, loading } = useFetchEvents();
    const [categoryList, setCategoryList] = useState<string[]>([])
    const [teamInfo, setTeamInfo] = useState<Team>(defaultTeam);
    const [selectedEvent, setSelectedEvent] = useState<VolleyEvent>(defaultVolleyEvent);

    const handleGoBack = () => { router.replace('/admin') };

    const handleSelectEvent = (volleyEvent: VolleyEvent) => {
        setSelectedEvent(volleyEvent);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (checked) {
                setTeamInfo((prevInfo) => ({
                    ...prevInfo,
                    categories: [...prevInfo.categories, name],
                }));
            } else {
                setTeamInfo((prevInfo) => ({
                    ...prevInfo,
                    categories: prevInfo.categories.filter((cat) => cat !== name),
                }));
            }
        } else {
            setTeamInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamInfo((prevInfo) => ({ ...prevInfo, masc: e.target.id === 'men' }));
    };

    function cleanForm(): void {
        setTeamInfo(defaultTeam);
        document.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((checkbox) => { checkbox.checked = false });
        document.querySelectorAll<HTMLInputElement>("input[type=radio]").forEach((radio) => { radio.checked = false });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        CreateNewTeam(teamInfo, selectedEvent.id)
        cleanForm();
    };

    useEffect(() => {
        setCategoryList(selectedEvent.categories);
        setTeamInfo((prevInfo) => ({ ...prevInfo, categories: [] }));
        document.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((checkbox) => { checkbox.checked = false });
    }, [selectedEvent])


    return (
        <main className='min-h-full'>
            <header className="relative border border-black">
                <button onClick={handleGoBack} className="text-3xl absolute top-2 left-3"> <FaArrowLeftLong /> </button>
                <h1 className='text-5xl w-full text-center my-10 uppercase'> Manage teams </h1>
            </header>

            <section className='flex mx-16'>
                <div className="w-1/2">
                    <p className='text-lg ml-6' >List of events</p>
                    {
                        loading ? <TeamLoader /> :
                            <ul className='w-full text-xl ml-12'>
                                {volleyEvents.map((e, i) => (
                                    <li onClick={() => { handleSelectEvent(e) }} className='cursor-pointer w-1/2 hover:w-3/5 my-2 bg-secondary rounded py-2 px-4 hover:translate-x-2 transition-all' key={i}> {e.name} </li>
                                ))}
                            </ul>
                    }
                </div>

                <div className="w-full">
                    <p className="text-center text-xl tracking-tighter">  Selected event: <span className='font-bold tracking-normal'>{selectedEvent.name}</span> </p>

                    <form onSubmit={handleSubmit} className='w-1/2 mx-auto'>
                        <div className="space-y-12">
                            <div className="border-b border-white/90 pb-12">
                                <p className="mt-1  leading-6">
                                    Fill the necesary information about the new team to add.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6">
                                    <h2 className="text-base font-semibold leading-7">Team Members</h2>
                                    <div className="col-span-4">
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm">
                                                <span className="flex select-none items-center px-3 bg-secondary-900 rounded-l-md">Player 1</span>
                                                <input
                                                    value={teamInfo.player1}
                                                    onChange={handleInputChange}
                                                    autoComplete='off'
                                                    type="text"
                                                    name="player1"
                                                    id="player1"
                                                    className="block flex-1 py-1.5 pl-2 rounded-r-md focus:outline-none text-black"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm">
                                                <span className="flex select-none items-center px-3 bg-secondary-900 rounded-l-md">Player 2</span>
                                                <input
                                                    value={teamInfo.player2}
                                                    onChange={handleInputChange}
                                                    autoComplete='off'
                                                    type="text"
                                                    name="player2"
                                                    id="player2"
                                                    className="block flex-1 py-1.5 pl-2 rounded-r-md focus:outline-none text-black"
                                                />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">

                                <div className="mt-10 space-y-10">

                                    <fieldset className="flex flex-row">
                                        <legend className="text-base font-semibold leading-7">Team Category</legend>

                                        <div className="mt-2 w-full flex gap-14 items-center">
                                            {
                                                categoryList.map((c, i) => (
                                                    <div key={i} className="flex gap-x-3">
                                                        <div className="flex items-center">
                                                            <input
                                                                onChange={handleInputChange}
                                                                id={c}
                                                                name={c}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded "
                                                            />
                                                        </div>
                                                        <div className=" leading-6">
                                                            <label htmlFor={c} className="font-medium">
                                                                {c}
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend className="text-base font-semibold leading-7">Team Gender</legend>

                                        <div className="mt-2 flex gap-14">

                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    onChange={handleRadioChange}
                                                    id="men"
                                                    name="masc"
                                                    type="radio"
                                                    className="h-4 w-4"
                                                />
                                                <label htmlFor="men" className="block  font-medium leading-6">
                                                    Men
                                                </label>
                                            </div>

                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    onChange={handleRadioChange}
                                                    id="women"
                                                    name="masc"
                                                    type="radio"
                                                    className="h-4 w-4"
                                                />
                                                <label htmlFor="women" className="block  font-medium leading-6">
                                                    Women
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>

                                </div>
                            </div>

                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                className="rounded-md bg-primary px-3 py-2  font-semibold text-white shadow-sm hover:bg-primary-400"
                            >
                                Save new team
                            </button>
                        </div>

                    </form>
                </div>
            </section>

        </main>
    )
}

function TeamLoader() {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}