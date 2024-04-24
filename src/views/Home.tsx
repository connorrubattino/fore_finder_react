import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";



type HomeProps = {}

export default function Home({}: HomeProps) {
  return (
    <Card className="card bg-transparent border-0 text-center mt-5 text-white font-weight-bold">
      <Card.Header><h1>Welcome to Fore Finder</h1></Card.Header>
      <Card.Body>
        <Card.Title className='p-5' ><h3>Looking for a tee time?</h3></Card.Title>
        <Card.Text className='pb-5' >
          Your journey to your next fantastic day on the course with great people starts here!
        </Card.Text>
        <Link to={`/teetimes`}><Button className='w-75' variant="success">Find Tee Times</Button></Link>
      </Card.Body>
    </Card>
  )
}