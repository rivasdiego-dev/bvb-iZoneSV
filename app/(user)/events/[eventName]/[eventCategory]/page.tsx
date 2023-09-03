'use client'

import Contacts from "@/components/Contacts";
import { Team, VolleyEvent } from "@/firebase/interfaces";
import { GetEventByName, defaultVolleyEvent } from "@/firebase/services/events";
import { GetTeamsFromEventCategory } from "@/firebase/services/teams";
import { Montserrat, Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ['latin-ext'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const roboto = Roboto({ subsets: ["latin-ext"], weight: ["100", "300", "400", "500", "700", "900"] })


export default function Page({ params }: { params: { eventName: string, eventCategory: string } }) {

    let { eventName, eventCategory } = { ...params };
    eventName = decodeURIComponent(eventName);
    eventCategory = decodeURIComponent(eventCategory);

    const [teamsPlaying, setTeamsPlaying] = useState<Team[] | null | undefined>()
    const [showMasc, setShowMasc] = useState(true);
    const [selectedOption, setSelectedOption] = useState(0);

    const navOptions = ['Games', 'Teams', 'Positions']
    const tables = [<TableGames masc={showMasc} />, <TableTeams masc={showMasc} />, <TablePositions masc={showMasc} />]

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const volleyEvent = await GetEventByName(eventName);
                const teams = await GetTeamsFromEventCategory(volleyEvent?.id, eventCategory);
                setTeamsPlaying(teams);
            } catch (error) { }
        };
        fetchTeams();
    }, []);

    if (teamsPlaying === undefined) return <LoadingSkeleton />
    return (
        <main className='min-h-full flex flex-col'>

            <header>
                <h1 className={"text-center text-4xl font-bold py-4 " + montserrat.className}> {eventName} </h1>
                <div className="py-5 flex gap-6">
                    <div className={`basis-1/2 bg-secondary rounded-r text-3xl font-bold text-shadow py-2 px-4 ${montserrat.className}`}> {eventCategory} </div>
                    <div className={"basis-1/2 flex gap-2 text-3xl " + roboto.className}>
                        <button className={`${showMasc ? 'text-secondary-400' : ''} font-semibold`} onClick={() => { setShowMasc(true) }}> Man </button>
                        <button className={`${showMasc ? '' : 'text-secondary-400'} font-semibold`} onClick={() => { setShowMasc(false) }}> Woman </button>
                    </div>
                </div>
            </header>

            <nav className="flex justify-evenly py-4">
                {navOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedOption(index)}
                        className={`${roboto.className} ${selectedOption === index ? 'bg-primary text-shadow-sm scale-110' : 'bg-slate-200 text-slate-500'} font-bold rounded px-5 py-2 transition-all`}
                    >
                        {option}
                    </button>
                ))}
            </nav>

            {tables[selectedOption]}

            <Contacts />
        </main>
    )
}

interface TableProps { masc: boolean; }
function TableGames({ masc }: TableProps) {
    return masc ? (
        <section className="grow border border-blue-600">
            Man
        </section>
    ) : (
        <section className="grow border border-sky-400">
            Woman
        </section>
    )
}

function TableTeams({ masc }: TableProps) {
    return masc ? (
        <section className="grow border border-red-600">
            Man
        </section>
    ) : (
        <section className="grow border border-fuchsia-600">
            Woman
        </section>
    )
}

function TablePositions({ masc }: TableProps) {
    return masc ? (
        <section className="grow border border-green-600">
            Man
        </section>
    ) : (
        <section className="grow border border-teal-500">
            Woman
        </section>
    )
}

function LoadingSkeleton() {
    return (
        <main className='min-h-full flex flex-col items-center'>

            <div role="status" className="space-y-2.5 animate-pulse py-24">
                <div className="flex items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[400px]">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[440px]">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[360px]">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>

                <div className="h-16 rounded-full my-2.5"></div>

                <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">

                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-4 rounded-full my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-4 rounded-full my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 my-2.5"></div>

                    <span className="sr-only">Loading...</span>
                </div>

            </div>
        </main>
    )
}