import { CategoryType, GolferFormType } from "../types"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { register } from "../lib/apiWrapper";
import { useNavigate } from 'react-router-dom';

type SignUpProps = {

    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
}


export default function SignUp({flashMessage}: SignUpProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<GolferFormType>(
        {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            golfer_age: parseInt(''),
            city:'',
            district: '',
            country: '',
            password: '',
            confirm_password: ''
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(userFormData);

        let response = await register(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            let newUser = response.data!
            flashMessage(`Congrats ${newUser.first_name} ${newUser.last_name} has been created with the username ${newUser.username}`, 'success')
            navigate('/');
        }
    }

    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirm_password


  return (
    <>
            <h1 className="text-center text-white m-5">Sign Up Here</h1>
            <Card className="mb-5">
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='firstName'>First Name</Form.Label>
                        <Form.Control className='mb-2' id='first_name' name='first_name' placeholder='Enter First Name' value={userFormData.first_name} onChange={handleInputChange}/>
          
                        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                        <Form.Control className='mb-2' id='last_name' name='last_name' placeholder='Enter Last Name' value={userFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control className='mb-2' id='email' name='email' type='email' placeholder='Enter Email' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control className='mb-2' id='username' name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label htmlFor='golfer_age'>Age</Form.Label>
                        <Form.Control className='mb-2' id='golfer_age' name='golfer_age' placeholder='Enter Age' value={userFormData.golfer_age} onChange={handleInputChange}/>

                        <Form.Label htmlFor='city'>City</Form.Label>
                        <Form.Control className='mb-2' id='city' name='city' placeholder='Enter City' value={userFormData.city} onChange={handleInputChange}/>

                        <Form.Label htmlFor='district'>District / State</Form.Label>
                        <Form.Control className='mb-2' id='district' name='district' placeholder='Enter District(State)' value={userFormData.district} onChange={handleInputChange}/>

                        <Form.Label htmlFor='country'>Country</Form.Label>
                        <Form.Control className='mb-2' id='country' name='country' placeholder='Enter Country' value={userFormData.country} onChange={handleInputChange}/>


                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control className='mb-2' id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? "bi bi-eye-slash" : "bi bi-eye"}></i></InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor='confirm_password'>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='confirm_password' name='confirm_password' type={seePassword ? 'text' : 'password'} placeholder='Confirm Password' value={userFormData.confirm_password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? "bi bi-eye-slash" : "bi bi-eye"}></i></InputGroup.Text>
                        </InputGroup>

                        <Button disabled={disableSubmit} type='submit' variant='outline-primary' className='w-100 mt-3'>Create New Golfer</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
  )
}