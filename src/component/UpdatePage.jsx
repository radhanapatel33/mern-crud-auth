import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from "react-router"
import '../App.css'
import { updateUserData } from '../CrudRedux/Slices/CrudSlice';

function UpdatePage() {
    const { id } = useParams();
    console.log(id);

    const [updateData, setUpdateData] = useState({});
     const [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let data = useSelector((state) => state.allCrud.data);

    useEffect(() => {
        if (id && data.length) {
            console.log("All data:", data);
            const user = data.find((value) => value._id == id);
            console.log("Found user:", user);
            setUpdateData(user || {});
        }
    }, [id, data]);

    const getDetails = (event) => {
        const { name, value, type } = event.target;
        setUpdateData({
            ...updateData,
            [name]: type === 'number' ? Number(value) : value,
        });
    };
    
    const handelSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('_id', updateData._id);
        formData.append('student_name', updateData.student_name);
        formData.append('student_age', updateData.student_age);
        formData.append('student_email', updateData.student_email);
        formData.append('student_phone', updateData.student_phone);
        formData.append('student_gender', updateData.student_gender);

        if (file) {
            formData.append('student_photo', file);
        }

        const resultAction = await dispatch(updateUserData({ id: updateData._id, formData }));

        if (updateUserData.fulfilled.match(resultAction)) {
            alert('Your Data Updated Successfully...');
            navigate('/home');
        } else {
            console.log(resultAction.payload);
            alert('Update Failed!');
        }
    };

    return (

        <Container className="mt-4 ">
            <center><h2 className='m-3 ms-5 text-warning-emphasis'><i> Student Update Form </i></h2></center>

            <Form className='shadow-lg p-3 mb-5 bg-secondary text-white rounded-3' onSubmit={handelSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formID">
                        <Form.Label>Student_Id</Form.Label>
                        <Form.Control type="number" name='_id' placeholder="Enter id" value={updateData._id || ''}
                            readOnly required onChange={getDetails} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formName">
                        <Form.Label>Student_Name</Form.Label>
                        <Form.Control type="text" name='student_name' placeholder="Enter name" value={updateData.student_name || ''} required onChange={getDetails} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAge">
                        <Form.Label>Student_Age</Form.Label>
                        <Form.Control type="number" name='student_age' placeholder="Enter age" min="2" value={updateData.student_age || ''} onChange={getDetails} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Student_Email</Form.Label>
                        <Form.Control type="email" name='student_email' placeholder="Enter email" value={updateData.student_email || ''} required onChange={getDetails} />
                    </Form.Group>

                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPhoneNumber">
                        <Form.Label>Student_Phone </Form.Label>
                        <Form.Control type='tel' name='student_phone' placeholder="Enter number" value={updateData.student_phone || ''} onChange={getDetails} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGender">
                        <Form.Label>Student_Gender</Form.Label>
                        <Form.Select name='student_gender' value={updateData.student_gender || ''} onChange={getDetails}>
                            <option value=" " disabled>Select Gender</option>
                            <option>Female</option>
                            <option>Male</option>
                            <option>other</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formPhoto">
                    <Form.Label>Student_Photo</Form.Label>
                    <Form.Control
                        type="file" name="student_photo"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>

                <Button variant="warning" type="submit" className='me-4 my-3'>
                    Update
                </Button>
                <Link to='/home'>
                    <button className='btn btn-primary'>Home</button>
                </Link>
            </Form>
        </Container>
    )
}

export default UpdatePage;

