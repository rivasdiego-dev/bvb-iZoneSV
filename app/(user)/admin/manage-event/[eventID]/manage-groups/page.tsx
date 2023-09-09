'use client'
import { Team } from '@/firebase/interfaces';
import { GetEventByID } from '@/firebase/services/events';
import { GetAllTeamsFromEvent, defaultTeam } from '@/firebase/services/teams';
import { Category, Group, defaultCategory } from '@/firebase/types';
import { useEffect, useState } from 'react';


export default function Page({ params }: { params: { eventID: string } }) {
  const eventID = params.eventID;
  const [categories, setCategories] = useState<Category[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);

  useEffect(() => {
    const fetchInfo = async () => {
      const fetchedEvent = await GetEventByID(eventID);
      if (fetchedEvent)
        setCategories(fetchedEvent.categories);
      const fetchedTeams = await GetAllTeamsFromEvent(eventID);
      if (fetchedTeams)
        setTeams(fetchedTeams);
      console.log(fetchedTeams);
    }
    fetchInfo()
  }, [])

  return (
    <div>
      {categories.map((c, i) => (
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
      ))}
    </div>
  )
}

function FilterTeamsByCategoryAndGender(teams: Team[], category: string, isMasc: boolean) {
  return teams.filter(t => (t.masc === isMasc && t.categories.includes(category)))
}

function divideTeamsIntoGroups(teams: Team[], N: number, isMasc: boolean): Group[] {
  const groups: Group[] = [];

  for (let i = 0; i < N; i++) {
    const groupName = String.fromCharCode(65 + i);
    const groupTeams = teams.slice(i * Math.ceil(teams.length / N), (i + 1) * Math.ceil(teams.length / N));

    const group: Group = {
      name: groupName,
      masc: isMasc,
      teams: groupTeams,
    };
    groups.push(group);
  }

  return groups;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
