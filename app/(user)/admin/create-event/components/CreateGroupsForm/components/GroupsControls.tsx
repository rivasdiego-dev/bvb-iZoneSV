import { Team } from '@/firebase/interfaces';
import { UpdateEventCategory } from '@/firebase/services/events';
import { Category, Gender, Group, GroupsToDisplay, TeamsToDisplay } from '@/firebase/types';
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

    const handleCreateGroups = (gender: Gender) => {
        switch (gender) {
            case 'man':
                setGroups((prevGroups) => ({ ...prevGroups, men: divideTeamsIntoGroups(displayTeams.men, groupsNumber, gender), }));
                break;
            case 'woman':
                setGroups((prevGroups) => ({ ...prevGroups, women: divideTeamsIntoGroups(displayTeams.women, groupsNumber, gender), }));
                break;
            case 'mix':
                setGroups((prevGroups) => ({ ...prevGroups, mix: divideTeamsIntoGroups(displayTeams.mix, groupsNumber, gender), }));
                break;
            default:
                break;
        }
    };

    const handleSaveGroups = () => {
        UpdateEventCategory(eventID, selectedCategory)
        setGroups({ men: [], women: [], mix: [] });
        setGroupsNumber(0);
    };

    useEffect(() => {
        setSelectedCategory(prev => ({ ...prev, groups: [...groups.men, ...groups.women, ...groups.mix] }))
    }, [groups])


    return (
        <div className="flex items-center lg:flex-nowrap flex-wrap m-auto mt-8 gap-4">
            <p className=''>Número de grupos a crear:</p>

            <input onChange={handleInputChange} value={groupsNumber} name='groupsNumber' autoComplete='off' type="number" className='tracking-wide rounded py-1 px-2 bg-transparent focus:outline-none ' id="groupsNumber" />

            <button onClick={() => { handleCreateGroups('man') }} type='button' className={`mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}>
                Crear grupos masculinos
            </button>

            <button onClick={() => { handleCreateGroups('woman') }} type='button' className={`mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}>
                Crear grupos femeninos
            </button>

            <button onClick={() => { handleCreateGroups('mix') }} type='button' className={`mx-auto px-6 bg-slate-600 rounded py-1 xl:whitespace-nowrap`}>
                Crear grupos mixtos
            </button>

            <button onClick={handleSaveGroups} type='button' disabled={(groups.men.length === 0 && groups.mix.length === 0 && groups.women.length === 0)}
                className={`${(groups.men.length === 0 && groups.women.length === 0 && groups.mix.length === 0) ? 'cursor-not-allowed text-slate-900' : ''} mx-auto px-6 bg-blue-600 rounded py-1 xl:whitespace-nowrap`} >
                Guardar grupos
            </button>

        </div>
    )
}

function divideTeamsIntoGroups(teams: Team[], N: number, gender: Gender): Group[] {
    // Ensure N does not exceed the number of teams available
    N = Math.min(N, teams.length);

    const teamsPerGroup = Math.floor(teams.length / N);
    const remainder = teams.length % N;

    let startIndex = 0;
    const groups: Group[] = [];

    for (let i = 0; i < N; i++) {
        const groupName = String.fromCharCode(65 + i);
        let groupSize = teamsPerGroup;

        if (i < remainder) {
            groupSize++; // Distribute the remainder teams
        }

        const groupTeams = teams.slice(startIndex, startIndex + groupSize);
        startIndex += groupSize;

        groups.push({
            name: groupName,
            gender: gender,
            teams: groupTeams,
        });
    }

    return groups;
}
