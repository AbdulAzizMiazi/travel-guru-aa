import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import { userStatusContext } from '../../App';
import searchData from './searchData';
import SearchShower from './SearchShower';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

const searchPageStyle = {
    searchPageStyle:{
        paddingTop: '1%',
        paddingBottom: '5.9%',
    },
}
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const libraries = ["places"];
const center = {
    lat: 23.777176,
    lang: 90.399452,
}

const SearchPage = () => {

    const[userStatus, setUserStatus] = useContext(userStatusContext);
    const {toDate, destination, authorized} = userStatus;
    console.log(userStatus);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading Maps";

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
                        <div>
                            <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={8}
                            center
                            ></GoogleMap>
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
        </div>
    );
};

export default SearchPage;