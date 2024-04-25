import { TeetimeFormType} from "../types";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';



type TeetimeFormProps = {
    addNewTeetime: (data: TeetimeFormType) => void
    // flashMessage: (newMessage:string, newCategory:CategoryType) => void
// took out flash message to try to get it from the teetimes page
}


export default function TeetimeForm({addNewTeetime}: TeetimeFormProps) {

    const [newTeetime, setNewTeetime] = useState<TeetimeFormType>({course_name: '', price: parseInt(''), teetime_date: '', teetime_time: '', space_remaining: parseInt(''), course_id: parseInt('')});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTeetime({...newTeetime, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewTeetime(newTeetime)
        // flashMessage('Tee Time added!', 'success');
    }

  return (
    <>
    <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Tee Time</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control name='course_name' placeholder='Which course are you playing?' value={newTeetime.course_name} onChange={handleInputChange} />
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control name='course_id' placeholder='What is the course ID?' value={newTeetime.course_id} onChange={handleInputChange} />
                    <Form.Label>Price</Form.Label>
                    <Form.Control name='price' placeholder='How much is the round? (Round to nearest dollar)' value={newTeetime.price} onChange={handleInputChange} />
                    <Form.Label>Date</Form.Label>
                    <Form.Control name='teetime_date' placeholder='When is the round? (MM/DD/YYYY)' value={newTeetime.teetime_date} onChange={handleInputChange} />
                    <Form.Label>Time</Form.Label>
                    <Form.Control name='teetime_time' placeholder='What time is the round? (ex: 1:00 PM EST)' value={newTeetime.teetime_time} onChange={handleInputChange} />
                    <Form.Label>Space Remaining</Form.Label>
                    <Form.Control name='space_remaining' placeholder='How many spots are available? (1, 2, or 3)' value={newTeetime.space_remaining} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Tee Time</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}