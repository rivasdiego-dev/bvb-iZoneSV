'use client'
import { Team } from '@/firebase/interfaces';
import { GetEventByID } from '@/firebase/services/events';
import { GetAllTeamsFromEvent, defaultTeam } from '@/firebase/services/teams';
import { Category, Gender, Group, defaultCategory } from '@/firebase/types';
import { useEffect, useState } from 'react';


export default function Page({ params }: { params: { eventID: string } }) {
  // const eventID = params.eventID;
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [teams, setTeams] = useState<Team[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     const fetchedEvent = await GetEventByID(eventID);
  //     if (fetchedEvent)
  //       setCategories(fetchedEvent.categories);
  //     const fetchedTeams = await GetAllTeamsFromEvent(eventID);
  //     if (fetchedTeams)
  //       setTeams(fetchedTeams);
  //     console.log(fetchedTeams);
  //   }
  //   fetchInfo()
  // }, [])

  return (
    <div>
      {/* {categories.map((c, i) => (
        <div className="" key={i}>
          <p className="text-secondary font-bold text-lg"> {c.name} </p>
          <p className="text-secondary-400 font-bold text-lg">Man</p>
          {
            FilterTeamsByCategoryAndGender(teams, c.name, true).map((t, j) => (
              <div key={j}> {t.teamName} </div>
            ))
          }
          <p className="text-secondary-400 font-bold text-lg">Woman</p>
          {
            FilterTeamsByCategoryAndGender(teams, c.name, false).map((t, j) => (
              <div key={j}> {t.teamName} </div>
            ))
          }

        </div>
      ))} */}
    </div>
  )
}