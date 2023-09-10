import { Team } from '@/firebase/interfaces';
import { UpdateEventCategory } from '@/firebase/services/events';
import { Category, Group, defaultCategory, TeamsToDisplay, GroupsToDisplay } from '@/firebase/types';
import React, { useEffect, useState } from 'react';
import TeamsAndCategories from './components/TeamsAndCategories';
import Groups from './components/Groups';
import GroupsControls from './components/GroupsControls';
import Title from '../Title';

type Props = {
    eventID: string;
};

export default function CreateGroupsForm({ eventID }: Props) {

    const selectedCategoryState = useState<Category>(defaultCategory);
    const displayTeamsState = useState<TeamsToDisplay>({ men: [], women: [] });
    const groupsState = useState<GroupsToDisplay>({ men: [], women: [] });


    useEffect(() => { }, [selectedCategoryState[0]])


    return (
        <>
            <Title> Creación de grupos </Title>
            <section className='flex flex-wrap gap-y-8 px-12'>


                <TeamsAndCategories eventID={eventID} displayTeamsState={displayTeamsState} selectedCategoryState={selectedCategoryState} />

                <Groups groups={groupsState[0]} selectedCategory={selectedCategoryState[0]} />

                <GroupsControls eventID={eventID} selectedCategoryState={selectedCategoryState} groupsState={groupsState} displayTeams={displayTeamsState[0]} />

            </section>
        </>
    );
}
