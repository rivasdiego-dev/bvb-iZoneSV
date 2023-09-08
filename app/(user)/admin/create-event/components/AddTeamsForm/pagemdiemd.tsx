import { Team, VolleyEvent } from '@/firebase/interfaces';
import { GetEventByID, defaultVolleyEvent } from '@/firebase/services/events';
import { CreateNewTeam, defaultTeam } from '@/firebase/services/teams';
import { Category } from '@/firebase/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';


export default function page({ params }: { params: { eventID: string} }) {
    const router = useRouter();
    const eventID = params.eventID;
    const [categoryList, setCategoryList] = useState<Category[] | null>([])
    const [teamInfo, setTeamInfo] = useState<Team>(defaultTeam);
    const [selectedEvent, setSelectedEvent] = useState<VolleyEvent>(defaultVolleyEvent);

    const handleGoBack = () => { router.replace('/admin') };

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
        CreateNewTeam(teamInfo, eventID)
        cleanForm();
    };

    useEffect(() => {
      const fetchEvent = async () => {
        const fetchedEvent = await GetEventByID(eventID);
        if (fetchedEvent)
            setSelectedEvent(fetchedEvent);
      }
      fetchEvent()
    }, [])
    

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
                                                categoryList?.map((c, i) => (
                                                    <div key={i} className="flex gap-x-3">
                                                        <div className="flex items-center">
                                                            <input
                                                                onChange={handleInputChange}
                                                                id={c.name}
                                                                name={c.name}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded "
                                                            />
                                                        </div>
                                                        <div className=" leading-6">
                                                            <label htmlFor={c.name} className="font-medium">
                                                                {c.name}
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
