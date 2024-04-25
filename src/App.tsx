import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from "./components/Navigation";
import { CategoryType, GolferType } from './types';
import Home from "./views/Home";
import { getMe } from './lib/apiWrapper';
import AlertMessage from './components/AlertMessage';
import SignUp from './views/SignUp';
import Login from './views/Login';
import EditTeetime from './views/EditTeetime';
import Teetimes from './views/Teetimes';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import MyTeetimes from './views/MyTeetimes';
import CourseIds from './views/CourseIds';


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')||0) > new Date() ? true : false);
    const [loggedInUser, setLoggedInUser] = useState<GolferType|null>(null)

    const [message, setMessage] = useState<string|undefined>(undefined)
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    useEffect(() => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') || ''
                const response = await getMe(token);
                if (response.data){
                    setLoggedInUser(response.data);
                    localStorage.setItem('currentUser', JSON.stringify(response.data))
                } else {
                    setIsLoggedIn(false);
                    console.error(response.data);
                }
            }
        }
        getLoggedInUser()
    }, [isLoggedIn])

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        setTimeout(() => {
            if (newMessage && newCategory){
                flashMessage(undefined, undefined)
            }
        }, 5000)
    }

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('currentUser');
        flashMessage('You have been logged out', 'dark')
    }


    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
            {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/golfers' element={<SignUp flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} /> } />
                    <Route path='/edit/:teetimeId' element={<EditTeetime flashMessage={flashMessage} currentUser={loggedInUser} />} />
                    <Route path='/teetimes' element={<Teetimes isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />}/>
                    <Route path='/golfers/me' element={<Profile currentUser={loggedInUser!}/>} />
                    <Route path='/golfers/me/edit' element={<EditProfile logUserOut={logUserOut} flashMessage={flashMessage}/>} />
                    <Route path='/teetimes/me' element={<MyTeetimes isLoggedIn={isLoggedIn} flashMessage={flashMessage} currentUser={loggedInUser}/>}/>
                    <Route path='/courses' element={<CourseIds/>} />
                </Routes>
            </Container>
        </>
    )
}
