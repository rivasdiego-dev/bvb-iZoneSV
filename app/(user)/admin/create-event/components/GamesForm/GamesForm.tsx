import { Game } from '@/firebase/interfaces';
import { GetEventByID } from '@/firebase/services/events';
import { Category } from '@/firebase/types';
import { useEffect, useState } from 'react';
import Title from '../Title';

type Props = {
  eventID: string
}

export default function GamesForm({ eventID }: Props) {


  const [categories, setCategories] = useState<Category[]>([]);
  const allGames = generateGamesFromCategories(categories);

  useEffect(() => {
    const fetchInfo = async () => {
      const fetchedEvent = await GetEventByID(eventID);
      if (fetchedEvent) setCategories(fetchedEvent.categories);
    };
    fetchInfo();
  }, [eventID]);

  if (categories.length === 0) return <div className=""> Loading ... </div>

  return (
    <section className=''>
      <Title> Juegos en fase de grupos </Title>


      <div className="">
        <ul className=''>
          <p> Masculinos </p>
          {allGames.map((g, i) => {
            if (g.gender === 'man')
              return (
                <li className="grid grid-cols-7 text-center rounded py-2 px-4 my-2.5 bg-slate-800">
                  <p className='col-span-2'>{g.team1Name} </p>
                  <span className='font-bold text-xl leading-none'>v.s</span>
                  <p className='col-span-2'> {g.team2Name}</p>
                  <p> {g.group}</p>
                  <p> {g.category} </p>
                </li>
              )
          })}
        </ul>

        <ul className=''>
          <p> Femeninos </p>
          {allGames.map((g, i) => {
            if (g.gender === 'woman')
              return (
                <li className="grid grid-cols-7 text-center rounded py-2 px-4 my-2.5 bg-slate-800">
                  <p className='col-span-2'>{g.team1Name} </p>
                  <span className='font-bold text-xl leading-none'>v.s</span>
                  <p className='col-span-2'> {g.team2Name}</p>
                  <p> {g.group}</p>
                  <p> {g.category} </p>
                </li>
              )
          })}
        </ul>

        <ul className=''>
          <p> Otros </p>
          {allGames.map((g, i) => {
            if (g.gender === 'mix')
              return (
                <li className="grid grid-cols-7 text-center rounded py-2 px-4 my-2.5 bg-slate-800">
                  <p className='col-span-2'>{g.team1Name} </p>
                  <span className='font-bold text-xl leading-none'>v.s</span>
                  <p className='col-span-2'> {g.team2Name}</p>
                  <p> {g.group}</p>
                  <p> {g.category} </p>
                </li>
              )
          })}
        </ul>
      </div>
    </section>
  )
}


function generateGamesFromCategories(categories: Category[]): Game[] {
  const games: Game[] = [];

  for (const category of categories) {
    for (const group of category.groups) {
      const groupTeams = group.teams;

      for (let i = 0; i < groupTeams.length; i++) {
        for (let j = i + 1; j < groupTeams.length; j++) {
          const game: Game = {
            id: '',
            winnerID: '',
            finished: false,
            gender: groupTeams[i].gender,
            eventID: groupTeams[i].eventId,
            category: category.name,
            group: group.name,
            team1ID: groupTeams[i].id,
            team1Name: groupTeams[i].teamName,
            team1Sets: 0,
            team1Points: 0,
            team2ID: groupTeams[j].id,
            team2Name: groupTeams[j].teamName,
            team2Sets: 0,
            team2Points: 0,
          };
          games.push(game);
        }
      }
    }
  }

  return games;
}