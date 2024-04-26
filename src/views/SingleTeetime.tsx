import { useState, useEffect } from 'react';
import TeetimeCard from "../components/TeetimeCard";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
// import { CategoryType } from '../types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


type SingleTeetimeProps = {
  // teetimeId: Partial<TeetimeType>; // Assuming you receive the tee time ID as a prop
  // flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function SingleTeetime({}: SingleTeetimeProps) {
  const { teetimeId } = useParams();
  const [teetime, setTeetime] = useState<any>(null); // Assuming the shape of teetime data
  const [comments, setComments] = useState<any[]>([]); // Assuming the shape of comments data
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    // Fetch tee time data using the teetimeId
    fetch(`url/teetimes/${teetimeId}`)
      .then(response => response.json())
      .then(data => {
        setTeetime(data); // Set the tee time data
      })
      .catch(error => {
        console.error('Error fetching tee time:', error);
      });

    // Fetch comments data related to the tee time
    // Assuming you have an API endpoint for fetching comments associated with a tee time
    fetch(`url/teetimes/${teetimeId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data); // Set the comments data
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [teetimeId]); // This effect will run whenever teetimeId changes

  const fetchComments = () => {
    // Fetch comments data related to the tee time
    // Assuming you have an API endpoint for fetching comments associated with a tee time
    fetch(`url/teetimes/${teetimeId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data); // Update the comments state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        // Handle error, show error message, etc.
      });
  };

  const handleFormSubmit = (newComment: any) => {
    // Assuming you have an API endpoint to add a new comment for a tee time
    axios.post(`url/teetimes/${teetimeId}/golfer_comments`, newComment)
      .then(() => {
        // Assuming you want to update the comment list after successful addition
        fetchComments();
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        // Handle error, show error message, etc.
      });
  };
  
  const handleDeleteComment = (commentId: string|number) => {
    // Assuming you have an API endpoint to delete a comment
    axios.delete(`url/teetimes/${teetimeId}/golfer_comments/${commentId}`)
      .then(() => {
        // Assuming you want to update the comment list after successful deletion
        fetchComments(); // Function to refetch comments data
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        // Handle error, show error message, etc.
      });
    }

  return (
    <>
      <Container>
        {teetime && <TeetimeCard key={teetime.teetime_id} teetime={teetime} />}
      </Container>
        {/* {showForm && <CommentForm addNewComment={handleFormSubmit} />}
        <CommentList comments={comments} onDelete={handleDeleteComment} /> */}
    
    </>
  );
}