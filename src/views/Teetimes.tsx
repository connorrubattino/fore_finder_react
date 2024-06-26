import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeetimeCard from '../components/TeetimeCard';
import TeetimeForm from '../components/TeetimeForm';
import { TeetimeFormType, TeetimeType, CategoryType, GolferType } from '../types';
import { getAllTeetimes, createTeetime } from '../lib/apiWrapper';


type TeetimesProps = {
    isLoggedIn: boolean,
    currentUser: GolferType | null,
    flashMessage: (newMessage: string, newCategory: CategoryType) => void

}


export default function Teetimes({ isLoggedIn, currentUser, flashMessage }: TeetimesProps) {

    const [showForm, setShowForm] = useState(false);

    const [teetimes, setTeetimes] = useState<TeetimeType[]>([])

    const [fetchTeetimeData, setFetchTeetimeData] = useState(true);

    useEffect(() => {     //function that takes in a function and useEffect() runs after every render
        async function fetchData() {
            const response = await getAllTeetimes();
            if (response.data) {
                let teetimes = response.data;
                // teetimes.sort( (a, b) => (new Date(a.id) > new Date(b.id) ? -1 : 1) )
                // unsure on sorting - just doing by most recent as of now
                setTeetimes(teetimes)
            }
        }

        fetchData();
    }, [fetchTeetimeData])

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }


    const addNewTeetime = async (newTeetimeData: TeetimeFormType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createTeetime(token, newTeetimeData)
        if (response.error) {
            flashMessage(response.error, 'danger')
        } else if (response.data) {
            flashMessage(`Tee Time at ${response.data.course_name} has been created`, 'success')
            setShowForm(false);
            setFetchTeetimeData(!fetchTeetimeData)
        }
    }


    return (
        <>
            <h1 className="text-center text-white m-5">{isLoggedIn && currentUser ? `Hello ${currentUser?.first_name}!` : 'Welcome to Fore Fidner - Please Login or Sign Up!'}</h1>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Form.Control className='ms-4 text-center w-100' value={searchTerm} placeholder='Search Courses with Tee Times' onChange={handleInputChange} />
                </Col>
                {isLoggedIn && (
                    <Col>
                        <Button className='w-100 ms-4' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Tee Time+'}</Button>
                    </Col>
                )}
            </Row>
            {showForm && <TeetimeForm addNewTeetime={addNewTeetime} />}
            <Row className='me-5'>
                {teetimes.filter(t => t.course_name.toLowerCase().includes(searchTerm.toLowerCase())).map(t => <Col key={t.teetime_id} xs={6} md={4} lg={3}> <TeetimeCard key={t.teetime_id} teetime={t} currentUser={currentUser} /></Col>)}
            </Row>
        </>
    )
}