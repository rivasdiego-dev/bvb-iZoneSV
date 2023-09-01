'use client'

import useFetchEvents from '@/hooks/useFetchEvents';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {}

export default function Page({ }: Props) {
    const router = useRouter();
    const handleGoBack = () => {
        router.replace('/admin')
    }

    const volleyEvents = useFetchEvents();

    useEffect(() => {
        console.log(volleyEvents);
    }, [volleyEvents]);

    return (
        <div>
            <button onClick={() => { console.log(volleyEvents); }}> See Events </button>
        </div>
    )
}