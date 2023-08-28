'use client'
import Unauthorized from "@/components/Unauthorized";
import { firebaseDB } from "@/firebase/app";
import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
    title: 'iZoneSV - Admin',
    description: 'Beach Volleyball Information Zone',
    icons: '/admin.ico',
}

export default function AdminLayout({ children, }: { children: React.ReactNode }) {
    const userID = localStorage.getItem("id");
    const [userAuth, setUserAuth] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    async function verifyUser() {
        try {
            const querySnapshot = await getDocs(collection(firebaseDB, "users"));
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.id === userID)
                    if (userData.roles.includes("admin"))
                        setUserAuth(true);
            });
        } catch (error) {
            console.error("Couldn't verify user", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return userAuth ? <div className='h-full overflow-y-auto'> {children} </div> : <Unauthorized />
}

