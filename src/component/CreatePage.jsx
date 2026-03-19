import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router"
import '../App.css'
import { insertData } from '../CrudRedux/Slices/CrudSlice';

function CreatePage() {

    const [file, setFile] = useState(null);
    const [insertUserData, setInsertUserData] = useState({
        _id: "",
        student_name: "",
        student_age: "",
        student_email: "",
        student_phone: "",
        student_gender: "",
        student_photo: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('student_photo', file);
        formData.append('_id', insertUserData._id);
        formData.append('student_name', insertUserData.student_name);
        formData.append('student_age', insertUserData.student_age);
        formData.append('student_email', insertUserData.student_email);
        formData.append('student_phone', insertUserData.student_phone);
        formData.append('student_gender', insertUserData.student_gender);

        console.log(formData);

        dispatch(insertData(formData));
        alert("Your Data Inserted Successfully...");
        navigate('/home')
    }
    return (

        <Container className="mt-4">
            <h2 className='mt-3 mb-4 ms-5 text-warning-emphasis text-center'><i> Student Registration Form </i></h2>
            <Form className='shadow-lg p-3 mb-5 px-4 bg-secondary text-white rounded-3' onSubmit={handelSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formID">
                        <Form.Label>Student_Id</Form.Label>
                        <Form.Control type="number" name='_id' placeholder="Enter id" required
                            onChange={(e) => setInsertUserData({ ...insertUserData, _id: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formName">
                        <Form.Label>Student_Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter name" required
                            onChange={(e) => setInsertUserData({ ...insertUserData, student_name: e.target.value })} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Student_Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" required
                            onChange={(e) => setInsertUserData({ ...insertUserData, student_email: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPhoneNumber">
                        <Form.Label>student_Phone</Form.Label>
                        <Form.Control type='tel' name='phone' placeholder="Enter number"
                            onChange={(e) => setInsertUserData({ ...insertUserData, student_phone: e.target.value })} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAge">
                        <Form.Label>Student_Age</Form.Label>
                        <Form.Control type="number" name='age' placeholder="Enter age" min="1"
                            onChange={(e) => setInsertUserData({ ...insertUserData, student_age: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGender">
                        <Form.Label>Student_Gender</Form.Label>
                        <Form.Select defaultValue="" name='student_gender'
                            onChange={(e) => setInsertUserData({ ...insertUserData, student_gender: e.target.value })}>
                            <option value="" disabled>Select Gender</option>
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Student_Photo</Form.Label>
                    <Form.Control type="file" name='student_photo' placeholder="Enter photo" required
                        onChange={(e) => setFile(e.target.files[0])} />
                </Form.Group>

                <Button variant="success" type="submit" className='my-3 me-4'>
                    Submit
                </Button>
                <Link to='/home'>
                    <button className='btn btn-primary'>Home</button>
                </Link>
            </Form>
        </Container>
    )
}

export default CreatePage;

