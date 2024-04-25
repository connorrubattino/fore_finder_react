import { CourseType } from "../types";
import Card from 'react-bootstrap/Card';

type CourseCardProps = {
    course: CourseType
}

export default function CourseCard({ course }: CourseCardProps) {

    return (
        <>
            <Card className="m-5" >
                <Card.Header style={{ backgroundColor: '#228B22' }} as="h5" className="text-white">Course id: {course.course_id}</Card.Header>
                <Card.Body style={{ backgroundColor: '#f0f9e8' }}>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Card.Text>
                        Located at {course.address} in {course.city}, {course.district} -- {course.course_name} is a wonderful par {course.par}.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}