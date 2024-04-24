import { Link } from 'react-router-dom';
import { TeetimeType, GolferType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



type TeetimeCardProps = {
    teetime: TeetimeType,
    currentUser: GolferType | null,
}


export default function TeetimeCard({ teetime, currentUser }: TeetimeCardProps) {


    return (
        <>
            <Card style={{ width: '18rem' }}>
            {/* <Card> */}
                <Card.Img variant="top" src="/public/f256fa53f4a71faeafdc7d83ece05548-1.jpg" />
                <Card.Body>
                    <Card.Title>{teetime.course_name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price: {teetime.price}</ListGroup.Item>
                    <ListGroup.Item>Date: {teetime.teetime_date}</ListGroup.Item>
                    <ListGroup.Item>Time: {teetime.teetime_time}</ListGroup.Item>
                    <ListGroup.Item>Space Remaining: {teetime.space_remaining}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                {currentUser?.id === teetime.golfer_id && (
                    <Link to={`/edit/${teetime.id}`}><Button variant="warning">Edit Teetime</Button></Link>
                )}
                {currentUser?.id !== teetime.golfer_id && (
                    <Link to={`/teetimes/${teetime.id}/golfer_comments`}><Button variant="success">Join In</Button></Link>
                )}
                {/* ABOVE NOTSURE WHICH TO LIKE TO ONLY WANT ONE BUTTON IF LOGGED IN AND ONE BUTTON IF NOT */}
                </Card.Body>
            </Card>
        </>
    )
}