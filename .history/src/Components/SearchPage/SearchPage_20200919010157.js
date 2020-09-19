import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import { userStatusContext } from '../../App';
import searchData from './searchData';
import SearchShower from './SearchShower';

const searchPageStyle = {
    searchPageStyle:{
        paddingTop: '1%',
        paddingBottom: '5.9%',
    },
}

const SearchPage = () => {

    const[userStatus, setUserStatus] = useContext(userStatusContext);
    const {toDate, destination, authorized} = userStatus;
    console.log(userStatus);

    return (
        <div>
            <div style={searchPageStyle.searchPageStyle}>
            <div className="homeMainPortion">
            <hr/>
                <Row style={{marginRight:"0px"}}>
                    <Col sm={12} md={6}>
                        <div className='SelectedPlace'>
                            <h3>{authorized}</h3>
                            <p style={{color: 'grey', fontSize: '12px'}}>252 Stays {toDate} 3 guests</p>
                            <h1>Stay in {destination}</h1>
                            {
                                searchData.map(option =><SearchShower data={option} /> )
                            }
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        
                    </Col>
                </Row>
            </div>
            </div>
        </div>
    );
};

export default SearchPage;