import { GolferType, CategoryType, TeetimeType } from "../types";
import { useState, useEffect } from 'react';
import TeetimeCard from "../components/TeetimeCard";
import { getMyTeetimes } from "../lib/apiWrapper";


type MyTeetimesProps = {
    isLoggedIn: boolean,
    currentUser: GolferType | null,
    flashMessage: (newMessage: string, newCategory: CategoryType) => void
}


export default function MyTeetimes({ currentUser}: MyTeetimesProps) {

    const [teetimes, setTeetimes] = useState<TeetimeType[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchData() {
            const response = await getMyTeetimes(token!);
            if (response.data) {
                let teetimes = response.data['teetimes'];
                setTeetimes(teetimes)
            }
        }

        fetchData();
    }, [])


    return (
        <>
            <h1 className='text-center' >My Teetimes</h1>
            {teetimes.map((t) => (<TeetimeCard teetime={t} currentUser={currentUser} />))}
        </>
    )
}