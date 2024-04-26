import { CategoryType, GolferType, TeetimeFormType } from "../types";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeetimeById, editTeetimeById, deleteTeetimeById } from "../lib/apiWrapper";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


type EditTeetimeProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: GolferType|null
}

export default function EditTeetime({ flashMessage, currentUser }: EditTeetimeProps) {
    const { teetime_id } = useParams();
    const navigate = useNavigate();

    const [teetimeToEditData, setTeetimeToEditData] = useState<TeetimeFormType>({course_name: '', price: parseInt(''), teetime_date: '', teetime_time: '', space_remaining: parseInt(''), course_id: parseInt('')});
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect( () => {
        async function getTeetime(){
            let response = await getTeetimeById(teetime_id!)
            if (response.data){
                const teetime = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                if (currentUser?.id !== teetime.golfer_id){
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/')
                } else {
                    setTeetimeToEditData({course_name: teetime.course_name, price: teetime.price, teetime_date: teetime.teetime_date, teetime_time: teetime.teetime_time, space_remaining: teetime.space_remaining, course_id:teetime.course_id})
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/teetimes')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/teetimes')
            }
        }

        getTeetime()
    }, [teetime_id, currentUser] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeetimeToEditData({...teetimeToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editTeetimeById(teetime_id!, token, teetimeToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Your Tee Time at ${response.data?.course_name} has been updated`, 'success');
            navigate('/teetimes')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteTeetimeById(teetime_id!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            navigate('/')
        }
    }

    


  return (
    <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Tee Time</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Course</Form.Label>
                        <Form.Control name='course_name' placeholder='Edit Course Name' value={teetimeToEditData.course_name} onChange={handleInputChange} />
                        <Form.Label>Price</Form.Label>
                        <Form.Control name='price' placeholder='Edit Price' value={teetimeToEditData.price} onChange={handleInputChange} />
                        <Form.Label>Date</Form.Label>
                        <Form.Control name='teetime_date' placeholder='Edit Tee Time Date' value={teetimeToEditData.teetime_date} onChange={handleInputChange} />
                        <Form.Label>Time</Form.Label>
                        <Form.Control name='teetime_time' placeholder='Edit Tee Time.. Time' value={teetimeToEditData.teetime_time} onChange={handleInputChange} />
                        <Form.Label>Space Remaining</Form.Label>
                        <Form.Control name='space_remaining' placeholder='Edit Space Remaining' value={teetimeToEditData.space_remaining} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Tee Time</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Tee Time</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your Tee Time at {teetimeToEditData.course_name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Tee Time at {teetimeToEditData.course_name}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Tee Time</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}