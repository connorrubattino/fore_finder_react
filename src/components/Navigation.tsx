import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


type NavigationProps = {
    isLoggedIn: boolean,
    logUserOut: () => void,
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps) {


    return (
        <Navbar expand='lg' className="bg-body-success">
            <Container fluid>
                {/* <Navbar.Brand className='text-white' as={Link} to='/'>Fore Finder</Navbar.Brand> */}
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src= '/F-ff-logo-design-vector-Graphics-16738354-1-580x386.jpg'
                        width="50"
                        height="50"
                        className="d-inline-block align-top ms-3"
                        alt="Fore Finder Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link className='text-white' as={Link} to="/teetimes">Find Tee Times</Nav.Link>
                                {/* need to create route for just seeing own tee times */}
                                <Nav.Link className='text-white' as={Link} to="/teetimes/me">My Tee Times</Nav.Link>
                                <Nav.Link className='text-white' as={Link} to='/golfers/me'>My Profile</Nav.Link>
                                <Nav.Link className='text-white' as={Link} to='/courses'>Courses & Course IDs</Nav.Link>
                                <Nav.Link className='text-white' as={Link} to='/' onClick={() => logUserOut()}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className='text-white' as={Link} to='/golfers'>Sign Up</Nav.Link>
                                <Nav.Link className='text-white' as={Link} to='/login'>Log In</Nav.Link>
                                <Nav.Link className='text-white' as={Link} to='/courses'>Courses & Course IDs</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}