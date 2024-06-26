import { Link } from 'react-router-dom';
import { TeetimeType, GolferType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




type TeetimeCardProps = {
    teetime: TeetimeType,
    currentUser?: GolferType | null,
    // added ? above ====================================================
}


export default function TeetimeCard({ teetime, currentUser }: TeetimeCardProps) {

    const isLoggedIn = !!localStorage.getItem('token');


    return (
        <>
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
                        <Col key={teetime.course_name}>
                            <Card className='m-5' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="/f256fa53f4a71faeafdc7d83ece05548-1.jpg" />
                                <Card.Body>
                                    <Card.Title>{teetime.course_name}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Price: {teetime.price}</ListGroup.Item>
                                    <ListGroup.Item>Date: {teetime.teetime_date}</ListGroup.Item>
                                    <ListGroup.Item>Time: {teetime.teetime_time}</ListGroup.Item>
                                    <ListGroup.Item>Space Remaining: {teetime.space_remaining}</ListGroup.Item>
                                    <ListGroup.Item>Tee Time Owner: {teetime.golfer.first_name} {teetime.golfer.last_name}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Tee Time Vibes: 
                                        Handicap: {teetime.golfer.handicap || 'N/A'} |
                                        Alcohol: {teetime.golfer.alcohol || 'No'} | 
                                        Smoker: {teetime.golfer.smoker || 'No'} | 
                                        Gambler: {teetime.golfer.gambler || 'No'} | 
                                        Music: {teetime.golfer.music || 'No'} | 
                                        Tees: {teetime.golfer.tees || 'N/A'} 
                                        </ListGroup.Item>
                                {/* maybe should be a map above to map thru the comments */}
                                </ListGroup>
                                <Card.Body>
                                {currentUser?.golfer_id === teetime.golfer.golfer_id && (
                                    <Link to={`/edit/${teetime.teetime_id}`}><Button variant="warning">Edit Teetime</Button></Link>
                                )}
                                { isLoggedIn && (
                                    <Link className='ms-5' to={`/teetimes/${teetime.teetime_id}`}><Button variant="success">Join In</Button></Link>
                                )}
                                { !isLoggedIn && (
                                    <h5 className='text-center text-danger' >Login/Sign Up to join in!</h5>
                                )}
                                </Card.Body>
                            </Card>
                        </Col>
                </Row>
            </Container>

        </>
    )
}