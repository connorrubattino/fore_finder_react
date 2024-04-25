import { CourseType } from "../types";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { getAllCourses } from "../lib/apiWrapper";
import Container from 'react-bootstrap/Container';

type CourseIdsProps = {}
export default function CourseIds({}: CourseIdsProps) {
  
    const [courses, setCourses] = useState<CourseType[]>([])

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

  
    return (
    <>
    <Container className="text-center text-white"  >
    <h1>Courses</h1>
    </Container>
    {courses.map(c => <CourseCard key={c.course_id} course={c}/> )}
    </>
  )
}