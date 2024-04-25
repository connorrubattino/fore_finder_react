import { GolferType, CategoryType, TeetimeType } from "../types";
import { useState, useEffect } from 'react';
import TeetimeCard from "../components/TeetimeCard";
import { getMyTeetimes } from "../lib/apiWrapper";
import Col from 'react-bootstrap/Col';



type MyTeetimesProps = {
    isLoggedIn: boolean,
    currentUser: GolferType|null,
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
            <h1 className='text-center text-white' >My Tee Times</h1>
            {/* {teetimes.filter(t => t.golfer.golfer_id === currentUser!.golfer_id).map((t) => (<TeetimeCard teetime={t} currentUser={currentUser} />))} */}
            {/* {teetimes.map((t) => (<TeetimeCard teetime={t} currentUser={currentUser} />))} */}
            {teetimes.filter((t) => t.golfer.golfer_id === currentUser!.golfer_id).map( t => <Col key={t.course_name} xs={6} md={4} lg={3}> <TeetimeCard key={t.course_name} teetime={t} currentUser={currentUser} /></Col> )}
        </>
    )
}