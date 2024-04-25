import { CourseType } from "../types";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { getAllCourses } from "../lib/apiWrapper";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


type CourseIdsProps = {}
export default function CourseIds({}: CourseIdsProps) {
  
    const [courses, setCourses] = useState<CourseType[]>([])

    const [searchTerm, setSearchTerm] = useState('');

    // const [fetchCourseData, setFetchCourseData] = useState(true);

    useEffect(() => {     //function that takes in a function and useEffect() runs after every render
        async function fetchData(){
            const response = await getAllCourses();
            if (response.data){
                let courses = response.data;
                setCourses(courses)
            }
        }

        fetchData();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

  
    return (
    <>
    <Container className="text-center text-white mb-5 mt-5"  >
    <h1>Courses</h1>
    </Container>
    <Container className="text-center" >
        <Row className="justify-content-center"> 
            <Col xs={12} md={6} className="text-center"> 
                <Form.Control className="w-100" value={searchTerm} placeholder='Search Courses with Tee Times' onChange={handleInputChange}/>
            </Col>
        </Row>    
    </Container>
    {courses.filter(c => c.course_name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => <CourseCard key={c.course_name} course={c}/> )}
    </>
  )
}