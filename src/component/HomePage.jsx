import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getReadAllData } from '../CrudRedux/Slices/CrudSlice';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'


function HomePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const studentData = useSelector((state) => state.allCrud.data);
  console.log(studentData);

  const searchData = useSelector((state) => state.allCrud.search);

  // console.log(studentData);
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return;
    }
    dispatch(getReadAllData())
  }, [token, dispatch, navigate]);

  return (
    <>
      {
        studentData.length === 0 ? <br />:
        <div className="container">
          <h1 className='text-center text-warning-emphasis mt-2'>Home Page</h1>
          <Link to='/create'>
            <button className='btn btn-primary mb-5 border rounded-3 p-2'>Add Student</button>
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student_Id</th>
                <th>Student_Name</th>
                <th>Student_photo</th>
                <th>Student_Age</th>
                <th>Student_Email</th>
                <th>Student_Phone</th>
                <th>Student_Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                studentData.filter((value) => {
                  if (searchData.length == 0) {
                    return value;
                  } else {
                    return value.student_name.toLowerCase().includes(searchData.toLowerCase())
                  }
                })
                  .map((value) => {
                    return (
                      <tr key={value._id}>
                        <td>{value._id}</td>
                        <td>{value.student_name}</td>
                        <td><img src={`https://api-jwttoken-crud-backend-project.onrender.com/uploads/${value.student_photo}`} alt="" width={120} /></td>
                        <td>{value.student_age}</td>
                        <td>{value.student_email}</td>
                        <td>{value.student_phone}</td>
                        <td>{value.student_gender}</td>
                        <td>
                          <Link to={`/read/${value._id}`}>
                            <Button variant="outline-primary ms-3">Read</Button>
                          </Link>
                          <Link to={`/update/${value._id}`}>
                            <Button variant="outline-warning ms-3">Update</Button>
                          </Link>
                          <Link to={`/delete/${value._id}`}>
                            <Button variant="outline-danger ms-3">Delete</Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </Table>
        </div>
      }
    </>
  );
}

export default HomePage;

