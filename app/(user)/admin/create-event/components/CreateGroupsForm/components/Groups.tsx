import { Category, GroupsToDisplay } from '@/firebase/types'

type Props = {
    selectedCategory: Category,
    groups: GroupsToDisplay
}

export default function Groups({ groups, selectedCategory }: Props) {
    return (
        <div className="basis-full flex gap-6">
            <div className='basis-full flex flex-col'>
                <p> Grupos Masculinos {selectedCategory.name} </p>
                {groups.men.map((g, i) => (
                    <ol className="" key={i}>
                        <p> {g.name} </p>
                        {g.teams.map((t, j) => (
                            <li className='px-2 py-1 mb-2 bg-slate-700 rounded cursor-grab' key={j}>{j + 1}. {t.teamName}</li>
                        ))}
                    </ol>
                ))}
            </div>

            <div className='basis-full flex flex-col'>
                <p> Grupos Femeninos {selectedCategory.name} </p>
                {groups.women.map((g, i) => (
                    <ol className="" key={i}>
                        <p className='font-bold'> Grupo {g.name} </p>
                        {g.teams.map((t, j) => (
                            <li className='px-2 py-1 mb-2 bg-slate-700 rounded cursor-grab' key={j}>{j + 1}. {t.teamName}</li>
                        ))}
                    </ol>
                ))}
            </div>
        </div>
    )
}