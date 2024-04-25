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
            <ListGroup>
                <ListGroup.Item>Id:             {currentUser?.golfer_id}</ListGroup.Item>
                <ListGroup.Item>First Name:     {currentUser?.first_name}</ListGroup.Item>
                <ListGroup.Item>Last Name:      {currentUser?.last_name} </ListGroup.Item>
                <ListGroup.Item>Email:          {currentUser?.email} </ListGroup.Item>
                <ListGroup.Item>Username:       {currentUser?.username}</ListGroup.Item>
                <ListGroup.Item>Age:            {currentUser?.golfer_age}</ListGroup.Item>
                <ListGroup.Item>City:           {currentUser?.city}</ListGroup.Item>
                <ListGroup.Item>District/State: {currentUser?.district}</ListGroup.Item>
                <ListGroup.Item>Country:        {currentUser?.country}</ListGroup.Item>
                <ListGroup.Item>Handicap:       {currentUser?.handicap || 'null'}</ListGroup.Item>
                <ListGroup.Item>Right Handed:   {currentUser?.right_handed || 'null'}</ListGroup.Item>
                <ListGroup.Item>Alchohol:       {currentUser?.alchohol || 'null'}</ListGroup.Item>
                <ListGroup.Item>Legal Drugs:    {currentUser?.legal_drugs || 'null'}</ListGroup.Item>
                <ListGroup.Item>Smoker:         {currentUser?.smoker || 'null'}</ListGroup.Item>
                <ListGroup.Item>Gambler:        {currentUser?.gambler || 'null'}</ListGroup.Item>
                <ListGroup.Item>Music:          {currentUser?.music || 'null'}</ListGroup.Item>
                <ListGroup.Item>Tees:           {currentUser?.tees || 'null'}</ListGroup.Item>
                <ListGroup.Item>Phone:          {currentUser?.phone || 'null'}</ListGroup.Item>
            </ListGroup>
            <Container className="d-flex justify-content-center align-items-center mt-3 mb-3">
                <Row>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Link to={`/golfers/me/edit`}>
                            <Button style={{ minWidth: '150px' }}>Edit Profile</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            {/* need to figure out LINKS!! */}
        </>
    )
}