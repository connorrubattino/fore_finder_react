// import { useState, useEffect } from 'react';
import TeetimeCard from "../components/TeetimeCard";
// import CommentForm from "../components/CommentForm";
// import CommentList from "../components/CommentList";
// import { CategoryType } from '../types';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import TeetimeForm from "../components/TeetimeForm";
// import { createComment, getAllComments } from '../lib/apiWrapper';
// import { CommentType } from '../types';


type SingleTeetimeProps = {
  // teetimeId: Partial<TeetimeType>; // Assuming you receive the tee time ID as a prop
  // flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function SingleTeetime({}: SingleTeetimeProps) {
  const { teetimeId } = useParams();


//   useEffect(() => {     //function that takes in a function and useEffect() runs after every render
//     async function fetchData(){
//         const response = await getAllComments(teetimeId!);
//         if (response.data){
//             let comments = response.data;
//             setComments(comments)
//         }
//     }

//     fetchData();
// }, [fetchCommentData])


// const handleFormSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   const token = localStorage.getItem('token');
//   const response = await createComment(token, body, )

      
//   }

    


  return (
    <>
      <Container>
        {teetimeId && <TeetimeCard key={teetimeId} teetime={} />}
        {/* {showForm && <CommentForm addNewComment={} />}
        <CommentList onDelete={} comments={[]}/> */}
      </Container>
    </>
  );
}