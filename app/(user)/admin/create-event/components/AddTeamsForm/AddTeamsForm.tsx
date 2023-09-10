import { Team, VolleyEvent } from '@/firebase/interfaces';
import { CreateNewTeam, defaultTeam } from '@/firebase/services/teams';
import React, { useEffect, useState } from 'react';
import TeamCategory from './components/TeamCategory';
import TeamMembers from './components/TeamMembers';
import TeamGender from './components/TeamGender';
import { Category } from '@/firebase/types';
import { GetEventByID, defaultVolleyEvent } from '@/firebase/services/events';
import Title from '../Title';

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
        setTeamInfo(prev => ({ ...prev, player1: '', player2: '', id: '', teamName: '' }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, id } = e.target;
        setTeamInfo((prevInfo) => {
            if (type === 'checkbox') {
                const updatedCategories = checked ? [...prevInfo.categories, name] : prevInfo.categories.filter((cat) => cat !== name);
                return { ...prevInfo, categories: updatedCategories };
            } else if (type === 'radio' && id === 'men') {
                return { ...prevInfo, gender: 'man' };
            } else if (type === 'radio' && id === 'women') {
                return { ...prevInfo, gender: 'woman' };
            } else if (type === 'radio' && id === 'mix') {
                return { ...prevInfo, gender: 'mix' };
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
            <Title> Equipos del evento </Title>
            <p className="my-4  leading-6 text-slate-300">
                Completa el siguiente formulario cuantas veces sea necesario con la información de cada uno de los equipos que participaran en el evento.
            </p>

            <div className="space-y-6 flex flex-col">
                <TeamMembers handleInputChange={handleInputChange} teamInfo={teamInfo} />

                <div className="border border-white"></div>

                <div className="border-b border-gray-900/10">
                    <div className="space-y-4">
                        <TeamCategory handleInputChange={handleInputChange} categoryList={categoryList} setTeamInfo={setTeamInfo} />
                        <TeamGender handleInputChange={handleInputChange} />
                    </div>
                </div>

                <button onClick={handleSubmit}
                    className="rounded-md w-fit self-end bg-blue-600 px-3 py-2 text-shadow-sm text-lg hover:bg-blue-800 transition-all">
                    Agregar equipo al evento
                </button>
            </div>



        </>
    )
}