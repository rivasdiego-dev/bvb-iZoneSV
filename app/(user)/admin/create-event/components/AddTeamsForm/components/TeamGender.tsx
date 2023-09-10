import React from 'react'

type Props = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function TeamGender({ handleInputChange }: Props) {
    return (
        <fieldset>
            <legend className="text-base font-semibold leading-7"> Género </legend>

            <div className="mt-2 flex gap-14">

                <div className="flex items-center gap-x-3">
                    <input
                        onChange={handleInputChange}
                        id="men"
                        name="masc"
                        type="radio"
                        className="h-4 w-4"
                    />
                    <label htmlFor="men" className="block  font-medium leading-6">
                        Masculino
                    </label>
                </div>

                <div className="flex items-center gap-x-3">
                    <input
                        onChange={handleInputChange}
                        id="women"
                        name="masc"
                        type="radio"
                        className="h-4 w-4"
                    />
                    <label htmlFor="women" className="block  font-medium leading-6">
                        Femenino
                    </label>
                </div>

                <div className="flex items-center gap-x-3">
                    <input
                        onChange={handleInputChange}
                        id="mix"
                        name="masc"
                        type="radio"
                        className="h-4 w-4"
                    />
                    <label htmlFor="mix" className="block  font-medium leading-6">
                        Mixto
                    </label>
                </div>

            </div>
        </fieldset>
    )
}