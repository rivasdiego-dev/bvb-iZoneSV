import { Team, VolleyEvent } from '@/firebase/interfaces';
import { CreateNewTeam, defaultTeam } from '@/firebase/services/teams';
import React, { useEffect, useState } from 'react';
import TeamCategory from './components/TeamCategory';
import TeamMembers from './components/TeamMembers';
import TeamGender from './components/TeamGender';
import { Category } from '@/firebase/types';
import { GetEventByID, defaultVolleyEvent } from '@/firebase/services/events';

type Props = {
    eventID: string
}

export default function AddTeamsForm({ eventID }: Props) {

    const [teamInfo, setTeamInfo] = useState<Team>(defaultTeam);
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [selectedEvent, setSelectedEvent] = useState<VolleyEvent>(defaultVolleyEvent);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        CreateNewTeam(teamInfo, eventID)

        setTeamInfo(defaultTeam);
        document.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((checkbox) => { checkbox.checked = false });
        document.querySelectorAll<HTMLInputElement>("input[type=radio]").forEach((radio) => { radio.checked = false });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, id } = e.target;
        setTeamInfo((prevInfo) => {
            if (type === 'checkbox') {
                const updatedCategories = checked ? [...prevInfo.categories, name] : prevInfo.categories.filter((cat) => cat !== name);
                return { ...prevInfo, categories: updatedCategories };
            } else if (type === 'radio' && id === 'men') {
                return { ...prevInfo, masc: true };
            } else if (type === 'radio' && id === 'women') {
                return { ...prevInfo, masc: false };
            } else {
                return { ...prevInfo, [name]: value };
            }
        });
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
        setCategoryList(selectedEvent.categories)
    }, [selectedEvent])

    return (
        <>

            <div className="space-y-12">
                <div className="border-b border-white/90 pb-12">
                    <p className="mt-1  leading-6">
                        Fill the necesary information about the new team to add.
                    </p>

                    <TeamMembers handleInputChange={handleInputChange} teamInfo={teamInfo} />

                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 space-y-10">

                        <TeamCategory handleInputChange={handleInputChange} categoryList={categoryList} setTeamInfo={setTeamInfo} />

                        <TeamGender handleInputChange={handleInputChange} />

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={handleSubmit} type='button' className="rounded-md bg-primary px-3 py-2  font-semibold text-white shadow-sm hover:bg-primary-400"> Save new team </button>
            </div>

        </>
    )
}