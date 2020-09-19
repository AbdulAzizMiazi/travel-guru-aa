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

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { Link } from 'react-router-dom';

// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
//     ComboboxOptionText,
//   } from "@reach/combobox";
// import "@reach/combobox/styles.css";


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


//........................................................................................................
const SearchPage = () => {

    //taking an initial (lat and lng) values
    const center = {
        lat: 23.777176,
        lng: 90.399452,
    }

    const[userStatus, setUserStatus] = useContext(userStatusContext); //calling Context api
    const {toDate, destination, authorized} = userStatus; // destructuring the Context's object 

    //for loading the map
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    //for displaying loading condition
    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading Maps";

    const location = `${destination}, Bangladesh`;
   
    async function generatingLatAndLng() {
        console.log(location);
        try{
            const results = geocodeByAddress({location});
            console.log(results);
            const{lat, lng} = getLatLng(results[0])
            console.log(lat, lng);
        }
        catch(err){
            console.log(err);
        }
    }
    generatingLatAndLng();

    return (
        <div style={searchPageStyle.searchPageStyle}>
        <div className="homeMainPortion">
            <Row style={{marginRight:"0px"}}>

                {/**showing the options */}
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
                {/**end of showing the options..... */}

                {/**showing google map */}
                <Col sm={12} md={6}>
                    <div>
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