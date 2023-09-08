import { Team, VolleyEvent } from '@/firebase/interfaces';
import { Category } from '@/firebase/types';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
    categoryList: Category[],
    setTeamInfo: Dispatch<SetStateAction<Team>>,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function TeamCategory({ categoryList, setTeamInfo, handleInputChange }: Props) {

    useEffect(() => {
        setTeamInfo((prevInfo) => ({ ...prevInfo, categories: [] }));
        document.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((checkbox) => { checkbox.checked = false });
    }, [])

    return (
        <fieldset className="flex flex-row">
            <legend className="text-base font-semibold leading-7">Team Category</legend>
            <div className="mt-2 w-full flex gap-14 items-center">
                {
                    categoryList.map((c, i) => (
                        <div key={i} className="flex gap-x-3">
                            <div className="flex items-center">
                                <input
                                    onChange={handleInputChange}
                                    id={c.name}
                                    name={c.name}
                                    type="checkbox"
                                    className="h-4 w-4 rounded "
                                />
                            </div>
                            <div className=" leading-6">
                                <label htmlFor={c.name} className="font-medium">
                                    {c.name}
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </fieldset>
    )
}