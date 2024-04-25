import { CourseType } from "../types";
import Card from 'react-bootstrap/Card';

type CourseCardProps = {
    course: CourseType
}

export default function CourseCard({ course }: CourseCardProps) {

    return (
        <>
            <Card className="m-5" >
                <Card.Header as="h5">Course id: {course.course_id}</Card.Header>
                <Card.Body>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Card.Text>
                        Located at {course.address} in {course.city}, {course.district} -- {course.course_name} is a wonderful par {course.par}.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}