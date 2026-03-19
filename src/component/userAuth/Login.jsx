import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"
import "../../App.css";
import { userLogin } from "../../CrudRedux/Slices/Userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";


const Login = () => {
    //  local state (form data)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    // redux hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //  redux state
    const { isLoading, error } = useSelector((state) => state.userAuth);


    // input change handler
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    // form submit and redirect homepage after successful login
    const handleSubmit = async(e) => {
        e.preventDefault();
       const result = await dispatch(userLogin(loginData)); //redux call
       console.log(result);
       
       if(result.meta.requestStatus === "fulfilled"){
        navigate("/home")
       }
    };    
 
    return (
        <Container className="mt-4">
            <center><h2 className="text-warning-emphasis"><i>Login</i></h2></center>

            <Form onSubmit={handleSubmit} className="form shadow-lg p-3 mb-5 bg-secondary text-white rounded-3 m-auto mt-4 w-50">
                <Form.Group as={Col} controlId="formEmail" className="mb-3">
                    <Form.Label>Student_Email</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3"controlId="formPassword">
                    <Form.Label>Student_Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter password" required onChange={handleChange} />
                </Form.Group>

                <Button variant="warning" type="submit" className=' btn1 me-4'>Login
                </Button>

                <Link to='/'>
                    <button className='btn btn-primary btn1'>Register</button>
                </Link>
                {error && <p className="text-danger mt-2">{error}</p>}

            </Form>
        </Container>
    );
}

export default Login;
