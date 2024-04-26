import { CommentFormType} from "../types";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';



type CommentFormProps = {

    addNewComment: (data: CommentFormType) => void
}
export default function CommentForm({ addNewComment, }: CommentFormProps) {

    const [newComment, setNewComment] = useState<CommentFormType>({body: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment({...newComment, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewComment(newComment)
    }


  return (
    <>
    <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Comment</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Comment Below</Form.Label>
                    <Form.Control name='body' placeholder='Comment here!' value={newComment.body} onChange={handleInputChange} />
                    {/* should name be body or golfer_comment above */}
                    <Button className='mt-3 w-100' variant='success' type='submit'>Comment!</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}