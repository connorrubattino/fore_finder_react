import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { GolferType } from '../types';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


type ProfileProps = {
    currentUser: Partial<GolferType>
}


export default function Profile({ currentUser }: ProfileProps) {
    return (
        <>
            <h1 className='text-center text-white mb-5'>Your Account Info</h1>
            <ListGroup>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Id:             {currentUser?.golfer_id}</ListGroup.Item>
                <ListGroup.Item>First Name:     {currentUser?.first_name}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Last Name:      {currentUser?.last_name} </ListGroup.Item>
                <ListGroup.Item>Email:          {currentUser?.email} </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Username:       {currentUser?.username}</ListGroup.Item>
                <ListGroup.Item>Age:            {currentUser?.golfer_age}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>City:           {currentUser?.city}</ListGroup.Item>
                <ListGroup.Item>District/State: {currentUser?.district}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Country:        {currentUser?.country}</ListGroup.Item>
                <ListGroup.Item>Handicap:       {currentUser?.handicap}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Right Handed:   {currentUser?.right_handed ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item>alcohol:       {currentUser?.alcohol ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Legal Drugs:    {currentUser?.legal_drugs ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item>Smoker:         {currentUser?.smoker ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Gambler:        {currentUser?.gambler ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item>Music:          {currentUser?.music ? 'yes' : 'no'}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: '#f0f9e8' }}>Tees:           {currentUser?.tees}</ListGroup.Item>
                <ListGroup.Item>Phone:          {currentUser?.phone}</ListGroup.Item>
            </ListGroup>
            <Container className="d-flex justify-content-center align-items-center mt-3 mb-3">
                <Row>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Link to={`/golfers/me/edit`}>
                            <Button style={{ minWidth: '350px', backgroundColor: '#f0f9e8', borderColor: '#228B22', color: 'black' }}>Edit Profile</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            {/* need to figure out LINKS!! */}
        </>
    )
}