import { Team } from '@/firebase/interfaces';
import { GetEventByID } from '@/firebase/services/events';
import { GetAllTeamsFromEvent } from '@/firebase/services/teams';
import { Category, Gender, TeamsToDisplay } from '@/firebase/types';
import { useEffect, useState } from 'react';
import Teams from './Teams';

type Props = {
    eventID: string,
    selectedCategoryState: [Category, React.Dispatch<React.SetStateAction<Category>>],
    displayTeamsState: [TeamsToDisplay, React.Dispatch<React.SetStateAction<TeamsToDisplay>>]
}


export default function TeamsAndCategories({ eventID, displayTeamsState, selectedCategoryState }: Props) {

    const [selectedCategory, setSelectedCategory] = selectedCategoryState;
    const [displayTeams, setDisplayTeams] = displayTeamsState;

    const [categories, setCategories] = useState<Category[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const handleSelectCategory = (cat: Category) => setSelectedCategory(cat);

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
        setDisplayTeams({
            men: filterTeams(selectedCategory.name, 'man', teams),
            women: filterTeams(selectedCategory.name, 'woman', teams),
            mix: filterTeams(selectedCategory.name, 'mix', teams),
        });
    }, [selectedCategory]);

    return (
        <>
            <ul className="basis-1/6">
                {categories.map((c, i) => (
                    <li
                        key={i}
                        onClick={() => handleSelectCategory(c)}
                        className={`${selectedCategory.name === c.name ? 'bg-secondary-700' : 'bg-secondary-950'} w-9/12 hover:translate-x-6 text-lg pl-4 p-1 my-4 rounded transition-all cursor-pointer`}
                    >
                        {c.name}
                    </li>
                ))}
            </ul>

            <Teams displayTeams={displayTeams} />

        </>
    )
}


function filterTeams(category: string, gender: Gender, teams: Team[]) {
    return teams.filter((t) => t.categories.includes(category) && t.gender === gender);
}