import { editUser, deleteUser } from '../lib/apiWrapper';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CategoryType, GolferFormType, GolferType } from '../types';

type EditProfileProps = {
    logUserOut: () => void,
    flashMessage: (newMessage: string, newCategory: CategoryType) => void
    currentUser: GolferType|null
}


export default function EditProfile({ logUserOut, flashMessage, currentUser }: EditProfileProps) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [editGolferData, setEditGolferData] = useState<Partial<GolferFormType>>({
        first_name: currentUser?.first_name || '',
        last_name: currentUser?.last_name || '',
        email: currentUser?.email || '',
        username: currentUser?.username || '',
        golfer_age: currentUser?.golfer_age || 0,
        city: currentUser?.city || '',
        district: currentUser?.district || '',
        country: currentUser?.country || '',
        password: '',
        handicap: currentUser?.handicap || 10,
        right_handed: currentUser?.right_handed || false,
        alcohol: currentUser?.alcohol || false,
        legal_drugs: currentUser?.legal_drugs || false,
        smoker: currentUser?.smoker || false,
        gambler: currentUser?.gambler || false,
        music: currentUser?.music || false,
        tees: currentUser?.tees || '',
        phone: currentUser?.phone || ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditGolferData({ ...editGolferData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editGolferData.password){
            delete editGolferData.password
        }
        let response = await editUser(localStorage.getItem("token")!, editGolferData);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage("Golfer has been updated", 'success')
            navigate('/teetimes')
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteUser(token)
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`This golfer has been deleted`, 'success')
            logUserOut()
            navigate('/')
        }
    }


    return (
        <>
            <h1 className="text-center m-5 text-white">Edit Golfer Info Here!</h1>
            <Card style={{ backgroundColor: '#f0f9e8' }}>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='first_name'>First Name</Form.Label>
                        <Form.Control className='mb-2' id='first_name' name='first_name' placeholder='Enter First Name' value={editGolferData.first_name} onChange={handleInputChange} />

                        <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                        <Form.Control className='mb-2' id='last_name' name='last_name' placeholder='Enter Last Name' value={editGolferData.last_name} onChange={handleInputChange} />

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control className='mb-2' id='email' name='email' type='email' placeholder='Enter New Email' value={editGolferData.email} onChange={handleInputChange} />

                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control className='mb-2' id='username' name='username' type='username' placeholder='Enter New Username' value={editGolferData.username} onChange={handleInputChange} />

                        <Form.Label htmlFor='golfer_age'>Age</Form.Label>
                        <Form.Control className='mb-2' id='golfer_age' name='golfer_age' type='golfer_age' placeholder='Enter New golfer age' value={editGolferData.golfer_age} onChange={handleInputChange} />

                        <Form.Label htmlFor='city'>City</Form.Label>
                        <Form.Control className='mb-2' id='city' name='city' type='city' placeholder='Enter New city' value={editGolferData.city} onChange={handleInputChange} />

                        <Form.Label htmlFor='district'>District / State</Form.Label>
                        <Form.Control className='mb-2' id='district' name='district' type='district' placeholder='Enter New district/state' value={editGolferData.district} onChange={handleInputChange} />

                        <Form.Label htmlFor='country'>Country</Form.Label>
                        <Form.Control className='mb-2' id='country' name='country' type='country' placeholder='Enter New country' value={editGolferData.country} onChange={handleInputChange} />

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type='text' placeholder='Enter New Password' value={editGolferData.password} onChange={handleInputChange} />
                        </InputGroup>

                        <Form.Label htmlFor='handicap'>Handicap</Form.Label>
                        <Form.Control className='mb-2' id='handicap' name='handicap' type='handicap' placeholder='Enter New handicap' value={editGolferData.handicap} onChange={handleInputChange} />

                        <Form.Group controlId="right_handed" id='right_handed'>
                            <Form.Check
                                name='right_handed'
                                type="checkbox"
                                label="Right-Handed"
                                checked={editGolferData.right_handed || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, right_handed: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="alcohol" id='alcohol'>
                            <Form.Check
                                name='alcohol'
                                type="checkbox"
                                label="alcohol"
                                checked={editGolferData.alcohol || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, alcohol: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="legal_drugs" id='legal_drugs'>
                            <Form.Check
                                name='legal_drugs'
                                type="checkbox"
                                label="Legal Drugs"
                                checked={editGolferData.legal_drugs || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, legal_drugs: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="smoker" id='smoker'>
                            <Form.Check
                                name='smoker'
                                type="checkbox"
                                label="Smoker"
                                checked={editGolferData.smoker || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, smoker: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="gambler" id='gambler'>
                            <Form.Check
                                name='gambler'
                                type="checkbox"
                                label="Gambler"
                                checked={editGolferData.gambler || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, gambler: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="music" id='music'>
                            <Form.Check
                                name='music'
                                type="checkbox"
                                label="Music"
                                checked={editGolferData.music || false}
                                onChange={(e) => setEditGolferData({ ...editGolferData, music: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Label htmlFor='tees'>Tees</Form.Label>
                        <Form.Control className='mb-2' id='tees' name='tees' type='tees' placeholder='Enter New tees' value={editGolferData.tees} onChange={handleInputChange} />

                        <Form.Label htmlFor='phone'>Phone</Form.Label>
                        <Form.Control className='mb-2' id='phone' name='phone' type='phone' placeholder='Enter New phone' value={editGolferData.phone} onChange={handleInputChange} />

                        <Row>
                            <Col>
                                <Button className='w-100' type='submit' variant='outline-success' >Update Profile</Button>
                            </Col>
                            <Col>
                                <Button className='w-100' variant='danger' onClick={openModal}>Delete Profile</Button>
                            </Col>
                    </Row>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {editGolferData.first_name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {editGolferData.first_name}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDelete}>Delete User</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}