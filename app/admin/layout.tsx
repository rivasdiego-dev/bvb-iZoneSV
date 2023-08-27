import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'iZoneSV - Admin',
    description: 'Beach Volleyball Information Zone',
    icons: '/admin.ico',
}

export default function AdminLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className='h-full overflow-y-auto bg-blue-300'>
            {children}
        </div>
    )
}