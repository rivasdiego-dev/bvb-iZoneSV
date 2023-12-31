import { TeamsToDisplay } from '@/firebase/types'
import React from 'react'


type Props = {
    displayTeams: TeamsToDisplay
}

export default function Teams({ displayTeams }: Props) {
    return (
        <div className="basis-5/6 flex">
            <section className='basis-full'>
                <p className='text-center'> Masculino </p>
                <ul>
                    {displayTeams.men.map((t, i) => (
                        <li key={i}>{i + 1}. {t.teamName}</li>
                    ))}
                </ul>
            </section>

            <section className='basis-full'>
                <p className='text-center'> Femenino </p>
                <ul>
                    {displayTeams.women.map((t, i) => (
                        <li key={i}>{i + 1}. {t.teamName}</li>
                    ))}
                </ul>
            </section>

            <section className='basis-full'>
                <p className='text-center'> Mixto </p>
                <ul>
                    {displayTeams.mix.map((t, i) => (
                        <li key={i}>{i + 1}. {t.teamName}</li>
                    ))}
                </ul>
            </section>
        </div>
    )
}