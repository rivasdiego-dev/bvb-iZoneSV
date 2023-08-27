import React from 'react'


export default function Page({ params }: { params: { eventName: string } }) {

    return (
        <div>{params.eventName}</div>
    )
}