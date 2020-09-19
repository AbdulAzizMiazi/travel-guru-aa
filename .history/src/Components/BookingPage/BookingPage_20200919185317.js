import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../HomePage/data';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import { userStatusContext } from '../../App';


const bookingPageStyle = {
    bookingPageStyle:{
        paddingTop: '8%',
        paddingBottom: '5.9%',
    },
    myForm:{
        backgroundColor: 'white',
        padding: '2rem',
        width: '60%',
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    inputText:{
        color: 'grey',
        fontWeight: '500',
    }

}

const BookingPage = () => {
    const [userStatus, setUserStatus] = useContext(userStatusContext);
    
    const {category} = useParams();
    const {title, description} = data[category];
    const travelingInfo = {};

    const receivingIData = e =>{ 
        const name = e.target.name;
        const value = e.target.value;
        travelingInfo[name] = value;
    }
    const onSubmit = e =>{
        const addInfo = {...travelingInfo, ...userStatus};
        // addInfo.isNewUser = false;
        setUserStatus(addInfo);
        e.preventDefault();
    }
    console.log(userStatus);
    const goTo = '/searches';
    return (
        <div className="homePage" style={bookingPageStyle.bookingPageStyle}>
            <div className="homeMainPortion">
                <Row style={{marginRight:"0px"}}>
                    <Col sm={12} md={5}>
                    <div className='SelectedPlace'>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                    </Col>
                    <Col sm={12} md={7}>
                    <div style={bookingPageStyle.myForm}>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={bookingPageStyle.inputText}>Origin</Form.Label>
                            <Form.Control type="text" name="origin" onBlur={receivingIData}/>
                            <Form.Label style={bookingPageStyle.inputText}>Destination</Form.Label>
                            <Form.Control type="text" name="destination" onBlur={receivingIData} />
                            <Row>
                                <Col sm={12} md={6}>
                                    <Form.Label style={bookingPageStyle.inputText}>From</Form.Label>
                                    <Form.Control type="date" name="fromDate" onBlur={receivingIData} />
                                </Col>
                                <Col sm={12} md={6}>    
                                    <Form.Label style={bookingPageStyle.inputText}>To</Form.Label>
                                    <Form.Control type="date" name="toDate" onBlur={receivingIData} />
                                </Col>
                            </Row>
                        </Form.Group>
                        </Form>
                        <Link to={goTo}>
                            <button className="myBtn" style={{width: '100%'}}>
                                <span style={{color: 'black', fontWeight: '700'}}>Start Booking</span>
                            </button>
                        </Link>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default BookingPage;