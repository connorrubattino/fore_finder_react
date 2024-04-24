import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from "./components/Navigation";
import Home from "./views/Home";


export default function App() {


    return (
        <>
            <Navigation/>
            <Container>
                <Routes>
                    <Route path='/' element={<Home/>} />
                </Routes>
            </Container>
        </>
    )
}
