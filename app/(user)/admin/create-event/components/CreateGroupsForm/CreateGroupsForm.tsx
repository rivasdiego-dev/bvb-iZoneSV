import { Team } from '@/firebase/interfaces';
import { GetEventByID, UpdateEventCategory } from '@/firebase/services/events';
import { GetAllTeamsFromEvent } from '@/firebase/services/teams';
import { Category, Group, defaultCategory } from '@/firebase/types';
import React, { useEffect, useState } from 'react';

type Props = {
    eventID: string;
};

export default function CreateGroupsForm({ eventID }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);
    const [categories, setCategories] = useState<Category[]>([]);
    const [groupsNumber, setGroupsNumber] = useState(0);
    const [teams, setTeams] = useState<Team[]>([]);
    const [displayTeams, setDisplayTeams] = useState<Team[]>([]);
    const [displayTeamsFem, setDisplayTeamsFem] = useState<Team[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupsFem, setGroupsFem] = useState<Group[]>([]);

    const handleSelectCategory = (cat: Category) => setSelectedCategory(cat);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupsNumber(e.target.valueAsNumber);
    };

    const handleCreateGroups = () => {
        setGroups(divideTeamsIntoGroups(displayTeams, groupsNumber, true));
        setSelectedCategory(prev => ({ ...prev, groups: [...groups, ...groupsFem] }))
    };

    const handleCreateFemGroups = () => {
        setGroupsFem(divideTeamsIntoGroups(displayTeamsFem, groupsNumber, false));
        setSelectedCategory(prev => ({ ...prev, groups: [...groups, ...groupsFem] }))
    };

    const handleSaveGroups = () => {
        UpdateEventCategory(eventID, selectedCategory)
        setGroups([]);
        setGroupsFem([]);
        setGroupsNumber(0);
    };

    const filterTeams = (category: string, isMasc: boolean) =>
        teams.filter((t) => t.categories.includes(category) && t.masc === isMasc);

    const divideTeamsIntoGroups = (teams: Team[], N: number, isMasc: boolean): Group[] =>
        Array.from({ length: N }, (_, i) => {
            const groupName = String.fromCharCode(65 + i);
            const start = i * Math.ceil(teams.length / N);
            const end = (i + 1) * Math.ceil(teams.length / N);
            const groupTeams = teams.slice(start, end);

            return {
                name: groupName,
                masc: isMasc,
                teams: groupTeams,
            };
        });

    useEffect(() => {
        const fetchInfo = async () => {
            const fetchedEvent = await GetEventByID(eventID);
            if (fetchedEvent) setCategories(fetchedEvent.categories);
            const fetchedTeams = await GetAllTeamsFromEvent(eventID);
            if (fetchedTeams) setTeams(fetchedTeams);
        };
        fetchInfo();
    }, [eventID]);

    useEffect(() => {
        setDisplayTeams(filterTeams(selectedCategory.name, true));
        setDisplayTeamsFem(filterTeams(selectedCategory.name, false));
    }, [selectedCategory]);

    return (
        <section className='flex flex-wrap gap-y-8 px-12'>
            <ul className="basis-1/3">
                {categories.map((c, i) => (
                    <li
                        key={i}
                        onClick={() => handleSelectCategory(c)}
                        className={`${selectedCategory.name === c.name ? 'bg-secondary-700' : 'bg-secondary-950'} w-2/4 hover:translate-x-6 text-lg pl-4 p-1 my-4 rounded transition-all cursor-pointer`}
                    >
                        {c.name}
                    </li>
                ))}
            </ul>
            <div className="basis-2/3 flex">

                <section className='basis-full'>
                    <p className='text-center'> Masculino </p>
                    <ul>
                        {displayTeams.map((t, i) => (
                            t.masc && <li key={i}>{i + 1}. {t.teamName}</li>
                        ))}
                    </ul>
                </section>

                <section className='basis-full'>
                    <p className='text-center'> Femenino </p>
                    <ul>
                        {displayTeamsFem.map((t, i) => (
                            !t.masc && <li key={i}>{i + 1}. {t.teamName}</li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className="basis-full flex">
                <div className='basis-full flex flex-col'>
                    <p> Grupos Masculinos {selectedCategory.name} </p>
                    {groups.map((g, i) => (
                        <ol className="" key={i}>
                            <p> {g.name} </p>
                            {g.teams.map((t, j) => (
                                <li className='px-2 py-1 mb-2 bg-slate-700 rounded cursor-grab' key={j}>{j + 1}. {t.teamName}</li>
                            ))}
                        </ol>
                    ))}
                </div>

                <div className='basis-full flex flex-col'>
                    <p> Grupos Femeninos {selectedCategory.name} </p>
                    {groupsFem.map((g, i) => (
                        <ol className="" key={i}>
                            <p className='font-bold'> Grupo {g.name} </p>
                            {g.teams.map((t, j) => (
                                <li className='px-2 py-1 mb-2 bg-slate-700 rounded cursor-grab' key={j}>{j + 1}. {t.teamName}</li>
                            ))}
                        </ol>
                    ))}
                </div>
            </div>

            <div className="flex items-center lg:flex-nowrap flex-wrap m-auto mt-8 gap-4">
                <p className=''>Número de grupos a crear:</p>
                <input
                    onChange={handleInputChange}
                    value={groupsNumber}
                    name='groupsNumber'
                    autoComplete='off'
                    type="number"
                    className='tracking-wide rounded py-1 px-2 bg-transparent focus:outline-none '
                    id="groupsNumber"
                />
                <button
                    onClick={handleCreateGroups}
                    type='button'
                    disabled={selectedCategory === defaultCategory}
                    className={`${selectedCategory === defaultCategory ? 'cursor-not-allowed text-slate-900' : ''} mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}
                >
                    Crear grupos masculinos
                </button>
                <button
                    onClick={handleCreateFemGroups}
                    type='button'
                    disabled={selectedCategory === defaultCategory}
                    className={`${selectedCategory === defaultCategory ? 'cursor-not-allowed text-slate-900' : ''} mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}
                >
                    Crear grupos femeninos
                </button>
                <button
                    onClick={handleSaveGroups}
                    type='button'
                    disabled={selectedCategory === defaultCategory || (groups.length === 0 && groupsFem.length === 0)}
                    className={`${selectedCategory === defaultCategory || (groups.length === 0 && groupsFem.length === 0) ? 'cursor-not-allowed text-slate-900' : ''} mx-auto px-6 bg-blue-600 rounded py-1 xl:whitespace-nowrap`}
                >
                    Guardar grupos
                </button>
            </div>

        </section>
    );
}
