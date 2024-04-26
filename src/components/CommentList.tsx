// import { CommentType } from "../types";



// type CommentListProps = {
//     comments: CommentType[],
//     onDelete: (commentId: number) => void;
// }


// export default function CommentList({ comments, onDelete }: CommentListProps) {

//   return (
//     // <>
//     // <div>
//     //   <h3>Comments</h3>
//     //   {comments.length === 0 ? (
//     //     <p>No comments yet.</p>
//     //   ) : (
//     //     <ul>
//     //       {comments.map(comment => (
//     //         <li key={comment.golfer_comment_id}>
//     //           <div>
//     //             <p>{comment.body}</p>
//     //             <p>Posted by: {comment.golfer.first_name}</p>
//     //             <button onClick={() => onDelete(comment.golfer_comment_id)}>Delete</button>
//     //           </div>
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   )}
//     // </div>
//     // </>

// <>
//     <div>
//       <h3>Comments</h3>
//       {comments.length === 0 ? (
//         <p>No comments yet.</p>
//       ) : (
//         <ul>
//           {comments.map(comment => (
//             <li key={comment.golfer_comment_id}>
//               <div>
//                 {comment.body ? (
//                   <p>{comment.body}</p>
//                 ) : (
//                   <p>No body available</p>
//                 )}
//                 <p>Posted by: {comment.golfer.first_name}</p>
//                 <button onClick={() => onDelete(comment.golfer_comment_id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     </>
  
//   )
// }