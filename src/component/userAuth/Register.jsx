import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { userRegister } from "../../CrudRedux/Slices/Userslice";
import Container from "react-bootstrap/esm/Container";

const Register = () => {

  //  local state (form data)
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux state
  const { isLoading, error, success } = useSelector((state) => state.userAuth);

  // input change handler
  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  // form submit and redirect loginpage after successful register
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);

    dispatch(userRegister(registerData)); //  REDUX CALL
    navigate('/login')
  };

  return (
    <Container className="mt-4" >
      <center><h2 className="text-warning-emphasis"><i>Registration</i></h2></center>

      <Form onSubmit={handleSubmit} className="form shadow-lg p-3 mb-5 bg-secondary text-white rounded-3 m-auto mt-4 w-50">

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Student_Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter name"
            value={registerData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Student_Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={registerData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Student_Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={registerData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="btn1 me-4"
        >          
          Register
        </Button>

        <Link to="/login">
          <button className="btn btn-primary btn1">Login</button>
        </Link>

        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </Container>
  );
};

export default Register;
