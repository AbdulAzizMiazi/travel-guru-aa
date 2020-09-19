import React, { useContext, } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import { userStatusContext } from '../../App';
import searchData from './searchData';
import SearchShower from './SearchShower';
import {
    GoogleMap,
    useLoadScript,
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';


//styling portion starts here
const searchPageStyle = {
    searchPageStyle:{
        paddingTop: '1%',
        paddingBottom: '5.9%',
    },
}
const mapContainerStyle = {
    width: '48vw',
    height: '100vh',
    borderRadius: '10px',
}
//styling portion ends here......

const libraries = ["places"]; //for taking the libraries of "useLoadScript()" hook

const SearchPage = () => {
    const[userStatus, setUserStatus] = useContext(userStatusContext); //calling Context api
    const {toDate, destination, authorized} = userStatus; // destructuring the Context's object 

    //changing the page name after loading the page
    const onWindowLoad = ()=>{
        const updateContext = {...userStatus};
        updateContext.pageName = "SearchPage";
        setUserStatus(updateContext);
    }
    window.onload = onWindowLoad;

    //taking an initial (lat and lng) values
    const center = {
        lat: 23.777176,
        lng: 90.399452,
    }


    //for loading the map
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    //for displaying loading condition
    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading Maps";
   
    return (
        <div style={searchPageStyle.searchPageStyle}>
        <div className="homeMainPortion">
            <Row style={{marginRight:"0px"}}>

                {/**showing the options */}
                <Col sm={12} md={6}>
                    <div className='SelectedPlace'>
                        <h3>{authorized}</h3>
                        <p style={{color: 'grey', fontSize: '12px'}}>252 Stays {toDate} 3 guests</p>
                        <h1 style={{color: 'black', fontSize: '15px'}}>Stay in {destination}</h1>
                        {
                            searchData.map(option =><SearchShower data={option} /> )
                        }
                    </div>
                </Col>
                {/**end of showing the options..... */}

                {/**showing google map */}
                <Col sm={12} md={6}>
                    <div>
                    {/* </GoogleComponent> */}
                        <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={center}
                        ></GoogleMap>  
                    </div>
                    <br/><br/>
                    <Link to='/booking/0'>
                        <button className="myBtn">Back to Booking</button>
                    </Link>
                </Col>
                {/**end of showing google map..... */}

            </Row>
        </div>
        </div>
    );
};

export default SearchPage;