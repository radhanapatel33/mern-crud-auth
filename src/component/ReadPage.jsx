import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../App.css'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
function ReadPage() {

    const [readData, setReadData] = useState([]);

    const { id } = useParams();

    const data = useSelector((state) => state.allCrud.data);

    useEffect(() => {
        if (id) {
            let userData = data.filter((value) => value._id == id);
            setReadData(userData);
        }
    }, [id,data])

    return (
        <>
            <div>
                {
                    readData.map((item, index) => {
                        return (
                            <Container key={index}className='read-container mt-4 center'>
                                 <center><h2 className="m-3 ms-5 fst-italic text-warning-emphasis ">
                                            Student Details...
                                        </h2></center>
                                <div>
                                    <Card className='cards m-auto bg-secondary text-white '>
                                      <Card.Body className='item m-auto'>
                                            <Card.Title>{`Student_Id: ${item._id}`}</Card.Title>
                                            <Card.Title>{`Student_Name: ${item.student_name}`}</Card.Title>
                                            <Card.Title>{`Student_Photo: ${item.student_photo}`}</Card.Title>
                                            <Card.Title>{`Student_Age: ${item.student_age}`}</Card.Title>
                                            <Card.Title>{`Student_Email: ${item.student_email}`}</Card.Title>
                                            <Card.Title>{`Student_Phone: ${item.student_phone}`}</Card.Title>
                                            <Card.Title>{`Student_Gender: ${item.student_gender}`}</Card.Title>

                                            <Link to="/home">
                                                <Button className="custom-btn mt-3 me-3 rounded-pill ">
                                                    Go Back Home
                                                </Button>
                                            </Link>

                                            <Link to={`/update/${item._id}`}>
                                                <Button className="edit-btn btn-warning mt-3 rounded-pill px-4 ">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Container>
                        )
                    })
                }
            </div>
        </>
    );
}

export default ReadPage;

