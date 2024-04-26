// import { useState, useEffect } from 'react';
// import TeetimeCard from "../components/TeetimeCard";
// import CommentForm from "../components/CommentForm";
// import CommentList from "../components/CommentList";
// import { CategoryType } from '../types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import TeetimeForm from "../components/TeetimeForm";
import { CategoryType, CommentFormType, TeetimeType, CommentType } from "../types";
// import CommentForm from '../components/CommentForm';
import { createComment, getAllComments, deleteCommentById, getTeetimeById } from '../lib/apiWrapper';
// import CommentForm from '../components/CommentForm';
// import CommentList from '../components/CommentList';
// import { CommentType } from '../types';


type SingleTeetimeProps = {
  flashMessage: (message: string, category: CategoryType) => void
  currentUser: any
}

export default function SingleTeetime({ flashMessage, currentUser }: SingleTeetimeProps) {
  const { teetime_id } = useParams();
  const navigate = useNavigate();
  const [teetime, setTeetime] = useState<TeetimeType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<CommentFormType>({ body: '' });


  useEffect(() => {
    async function getTeetime() {
      try {
        const response = await getTeetimeById(teetime_id!);
        if (response.data) {
          setTeetime(response.data || null);
        } else {
          flashMessage('Teetime not found', 'warning');
          navigate('/'); // Navigate back to home page if teetime is not found
        }
      } catch (error) {
        flashMessage('Something went wrong', 'warning');
        navigate('/'); // Navigate back to home page in case of an error
      }
    }

    getTeetime();

  }, [teetime_id, flashMessage, navigate]);


  useEffect(() => {
    async function getComments() {
      try {
        const response = await getAllComments(teetime_id!);
        if (response.error) {
          flashMessage('Error retrieving comments', 'warning');
        } else {
          setComments(response.data || []);
        }
      } catch (error) {
        flashMessage('Something went wrong', 'warning');
        navigate('/');
      }
    }

    getComments();
  }, [teetime_id]);

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token');
  //   const response = await createComment(token, body, )


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value })
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await createComment(token!, teetime_id!, newComment); // Replace token with your authentication token
      if (response.error) {
        flashMessage('Error creating comments', 'warning');
      } else {
        // Add the new comment to the comments list
        setComments(comments => [...comments.concat(response.data!)]);
        // Clear the input field
        setNewComment({ body: '' });
      }
    } catch (error) {
      flashMessage('Error creating comments', 'warning');
    }
  };



  const handleDeleteComment = async (comment_id: number) => {

    try {
      const token = localStorage.getItem('token');
      if (currentUser.golfer_id === comments.find(comment => comment.golfer_comment_id === comment_id)?.golfer_id) {
        setComments(prevComments => prevComments.filter(comment => comment.golfer_comment_id !== comment_id));
        const response = await deleteCommentById(teetime_id!, token!, comment_id);

        if (response.data) {
          // Handle successful deletion (if needed)
          console.log('Comment deleted successfully:', response.data);
        } else {
          // Handle deletion failure (if needed)
          console.error('Deletion unsuccessful:', response.error);
          flashMessage('Error deleting comment', 'warning');
        }
      } else {
        flashMessage('Unauthorized to delete this comment', 'warning');
      }
    } catch (error) {
      flashMessage('Error deleting comment', 'warning');
    }
  };


  // const handleDeleteComment = async (comment_id: number) => {

  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await deleteCommentById(teetime_id!, token!, comment_id); // Replace token with your authentication token
  //     if (response.error) {
  //       flashMessage('Error deleting comment', 'warning');
  //     } else {
  //       // Remove the deleted comment from the comments list
  //       setComments(prevComments => prevComments.filter(comment => comment.golfer_comment_id !== comment_id));
  //     }
  //   } catch (error) {
  //     flashMessage('Error deleting comment', 'warning');
  //   }
  // };

  return (
    <>
      <Container>
        {teetime_id &&
          <Card className="text-center">
            <Card.Header>{teetime?.teetime_date}  ||  {teetime?.teetime_time}  ||  ${teetime?.price}</Card.Header>
            <Card.Body>
              <Card.Title>{teetime?.course_name}</Card.Title>
              <Card.Text>
                Want to play? Only room for {teetime?.space_remaining} more!
              </Card.Text>
              {currentUser.golfer_id && (
                <>
                  <Button onClick={() => setShowForm(true)}>Add Comment</Button>
                  {showForm &&
                    <Card className='my-3'>
                      <Card.Body>
                        <h3 className="text-center">Create New Comment</h3>
                        <Form onSubmit={handleFormSubmit}>
                          <Form.Label>Comment Below</Form.Label>
                          <Form.Control name='body' placeholder='Comment here!' value={newComment.body} onChange={handleInputChange} />
                          <Button className='mt-3 w-100' variant='success' type='submit'>Comment!</Button>
                          {/* maybe show form false right here============================= */}
                        </Form>
                      </Card.Body>
                    </Card>
                  }
                </>
              )}
            </Card.Body>
          </Card>
        }
        {teetime_id && comments.length > 0 && (
          <Card className="my-3">
            <Card.Body>
              <Card.Title>Comments</Card.Title>
              <ul key={teetime_id} className="list-group list-group-flush">
                {comments.map(comment => (
                  <li key={comment.golfer_comment_id} className="list-group-item">
                    <div>
                      {comment.body ? (
                        <p>{comment.body}</p>
                      ) : (
                        <p>No body available</p>
                      )}
                      <p>Posted by: {comment.golfer.first_name}</p>
                      <Button onClick={() => handleDeleteComment(comment.golfer_comment_id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )}
      </Container>

    </>

  );
}