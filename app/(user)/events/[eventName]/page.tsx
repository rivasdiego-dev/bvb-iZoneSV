import React from 'react'


export default function Page({ params }: { params: { eventName: string } }) {

    decodeURIComponent(params.eventName);

    return (
        <div>{}</div>
    )
}