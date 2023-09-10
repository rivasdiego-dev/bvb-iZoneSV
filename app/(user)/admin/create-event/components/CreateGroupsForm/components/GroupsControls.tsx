import { Team } from '@/firebase/interfaces';
import { UpdateEventCategory } from '@/firebase/services/events';
import { Category, Group, GroupsToDisplay, TeamsToDisplay, defaultCategory } from '@/firebase/types';
import React, { useEffect, useState } from 'react';

type Props = {
    eventID: string,
    groupsState: [GroupsToDisplay, React.Dispatch<React.SetStateAction<GroupsToDisplay>>]
    selectedCategoryState: [Category, React.Dispatch<React.SetStateAction<Category>>],
    displayTeams: TeamsToDisplay
}

export default function GroupsControls({ eventID, groupsState, selectedCategoryState, displayTeams }: Props) {

    const [groupsNumber, setGroupsNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = selectedCategoryState;
    const [groups, setGroups] = groupsState;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupsNumber(e.target.valueAsNumber);
    };

    const handleCreateGroups = (isMasc: boolean) => {
        if (isMasc) setGroups(prevGroups => ({ ...prevGroups, men: divideTeamsIntoGroups(displayTeams.men, groupsNumber, isMasc) }));
        else setGroups(prevGroups => ({ ...prevGroups, women: divideTeamsIntoGroups(displayTeams.women, groupsNumber, isMasc) }));
    };

    const handleSaveGroups = () => {
        UpdateEventCategory(eventID, selectedCategory)
        setGroups({ men: [], women: [] });
        setGroupsNumber(0);
    };

    useEffect(() => {
        setSelectedCategory(prev => ({ ...prev, groups: [...groups.men, ...groups.women] }))
    }, [groups])


    return (
        <div className="flex items-center lg:flex-nowrap flex-wrap m-auto mt-8 gap-4">
            <p className=''>Número de grupos a crear:</p>

            <input onChange={handleInputChange} value={groupsNumber} name='groupsNumber' autoComplete='off' type="number" className='tracking-wide rounded py-1 px-2 bg-transparent focus:outline-none ' id="groupsNumber" />

            <button onClick={() => { handleCreateGroups(true) }} type='button' className={`mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}>
                Crear grupos masculinos
            </button>

            <button onClick={() => { handleCreateGroups(false) }} type='button' className={`mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}>
                Crear grupos femeninos
            </button>

            <button onClick={handleSaveGroups} type='button' disabled={(groups.men.length === 0 && groups.women.length === 0)}
                className={`${(groups.men.length === 0 && groups.women.length === 0) ? 'cursor-not-allowed text-slate-900' : ''} mx-auto px-6 bg-blue-600 rounded py-1 xl:whitespace-nowrap`} >
                Guardar grupos
            </button>

        </div>
    )
}

function divideTeamsIntoGroups(teams: Team[], N: number, isMasc: boolean): Group[] {
    return Array.from({ length: N }, (_, i) => {
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
}