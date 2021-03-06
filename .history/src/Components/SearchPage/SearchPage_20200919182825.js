import React, { useContext, useState } from 'react';
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
import { GoogleComponent } from 'react-google-location'; //new here
import PlacesAutocomplete, {
    getGeocode,
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
const API_KEY = "AIzaSyAnRNmsjLqbUwepVXl0Cj4bRldDbZVmkFA"; //google api_key


//........................................................................................................
const SearchPage = () => {

    //taking an initial (lat and lng) values
    const center = {
        lat: 23.777176,
        lng: 90.399452,
    }

    const[userStatus, setUserStatus] = useContext(userStatusContext); //calling Context api
    const {toDate, destination, authorized} = userStatus; // destructuring the Context's object 

    //new way
    const [state , setState ] = useState({
        newLocation: null,
    });

    //for loading the map
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
    });

    //for displaying loading condition
    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading Maps";

    const location = `${destination}, Bangladesh`;


    // async function generatingLatAndLng() {
    //     console.log(location);
    //     try{
    //         // const results = await getGeocode({location});
    //         // console.log(results);
    //         const{lat, lng} = await getLatLng(location)
    //         console.log(lat, lng);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }
    // generatingLatAndLng();

    //new way 
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       place: null,
    //     };
    //   }

console.log(place);    
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
                    <GoogleComponent  
                        apiKey={API_KEY}
                        language={'en'}
                        country={'country:bd'}
                        coordinates={true}
                        currentCoordinates={center}
                        placeholder={'Start typing location'}
                        // locationBoxStyle={'custom-style'}
                        // locationListStyle={'custom-style-list'}
                        onChange={(e) => {setState ( {place: location} ) }} 
                        
                    />

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