import { Team } from '@/firebase/interfaces'
import React from 'react'

type Props = {
    teamInfo: Team,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TeamMembers({ handleInputChange, teamInfo }: Props) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6">
            <h2 className="text-base font-semibold leading-7">Team Members</h2>
            <div className="col-span-4">
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm">
                        <span className="flex select-none items-center px-3 bg-secondary-900 rounded-l-md">Player 1</span>
                        <input
                            value={teamInfo.player1}
                            onChange={handleInputChange}
                            autoComplete='off'
                            type="text"
                            name="player1"
                            id="player1"
                            className="block flex-1 py-1.5 pl-2 rounded-r-md focus:outline-none text-black"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm">
                        <span className="flex select-none items-center px-3 bg-secondary-900 rounded-l-md">Player 2</span>
                        <input
                            value={teamInfo.player2}
                            onChange={handleInputChange}
                            autoComplete='off'
                            type="text"
                            name="player2"
                            id="player2"
                            className="block flex-1 py-1.5 pl-2 rounded-r-md focus:outline-none text-black"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}