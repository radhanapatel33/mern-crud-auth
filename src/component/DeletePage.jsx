import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from "react-router"
import '../App.css'
import { deleteUserData } from '../CrudRedux/Slices/CrudSlice';

function DeletePage() {
    const { id } = useParams();
    console.log(id);

    const [deleteData, setDeleteData] = useState({});
    console.log(deleteData);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    let data = useSelector((state) => state.allCrud.data);
    console.log(data);

    useEffect(() => {
        if (id && data.length) {
            const user = data.find((value) => value._id == id);
            setDeleteData(user || {}); 
        }
    }, [id, data]);

    const handelSubmit = (event) => {
        event.preventDefault();
        dispatch(deleteUserData(deleteData._id)).then(() => {
            alert('Your Data Deleted Successfully...');
            navigate('/home');
        });
    }

        return (
            <Container className="mt-4">
                   <center><h2 className='m-3 ms-5 text-warning-emphasis'><i> Student Delete Form </i></h2></center>
                <Form className='shadow-lg p-3 mb-5 bg-secondary text-white rounded-3' onSubmit={handelSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formID">
                            <Form.Label>Student_Id</Form.Label>
                            <Form.Control type="number" name='_id' placeholder="Enter id" value={deleteData?._id || ""}
                                required disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Student_Name</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Enter name" value={deleteData.student_name || ""}
                                required disabled />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formAge">
                            <Form.Label>Student_Age</Form.Label>
                            <Form.Control type="number" name='age' placeholder="Enter age" min="2"
                                value={deleteData.student_age || ""} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Student_Email</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" value={deleteData.student_email || ""}
                                required disabled />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPhoneNumber">
                            <Form.Label>Student_Phone</Form.Label>
                            <Form.Control type='tel' name='phone' placeholder="Enter number"
                                value={deleteData.student_phone || ""} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGender">
                            <Form.Label>Student_Gender</Form.Label>
                            <Form.Select name='gender' value={deleteData.student_gender || ""} disabled>
                                <option value="" disabled>Select Gender</option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>other</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Button variant="danger" type="submit" className='me-4 my-2'>
                        Delete
                    </Button>
                    <Link to='/home'>
                        <button className='btn btn-primary'>Home</button>
                    </Link>
                </Form>
            </Container>
        )
    }

    export default DeletePage;

