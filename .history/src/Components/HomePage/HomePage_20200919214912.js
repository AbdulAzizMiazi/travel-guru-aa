import React, { useState } from 'react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col } from 'react-bootstrap';
import Sajek from '../../images/cetagories/Sajek.png';
import Sreemongol from '../../images/cetagories/Sreemongol.png';
import sundorbon from '../../images/cetagories/sundorbon.png';
import data from './data';
import { Link } from "react-router-dom";
import { userStatusContext } from '../../App';

const HomePage = () => {

    const[selectionCount, setSelectionCount] = useState(0);
    
    const controlsClicked = num => {
        const count = selectionCount + (num);
        document.getElementById(`image${selectionCount}`).className += "selectedItem";
        return count > -1 && count < 3 && setSelectionCount(count);
    }
    
    const goTo = `/booking/${selectionCount}`;
    return (        
        <div className="homePage">  

        {/**Home Page Main Portion starts here */}
            <div className="homeMainPortion">
                <Row style={{marginRight:"0px"}}>
                    <Col sm={4} md={4}>
                        <div className='SelectedPlace'>
                            <h1>{data[selectionCount].title}</h1>
                            <p>{data[selectionCount].shortDescription}</p>
                            <Link to={goTo}>
                                <button className="myBtn" >Booking&#x2192;</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={8} md={8}>
                        <div className="headerImg ml-4">
                        <Link to="/booking/0">
                            <img src={Sajek} id="image0" alt="" onClick={()=>setSelectionCount(0)}/>
                        </Link>
                        <Link to="/booking/1">
                            <img src={Sreemongol} id="image1" alt="" onClick={()=>setSelectionCount(1)}/>
                        </Link>
                        <Link to="/booking/2">
                            <img src={sundorbon} id="image2" alt="" onClick={()=>setSelectionCount(2)}/>
                        </Link>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="controls">
                <button className="toggleBtn" onClick={()=>controlsClicked(-1)}>&#x2039;</button>
                <button className="toggleBtn" onClick={()=>controlsClicked(1)}>&#x203A;</button>
            </div>
        {/**Home Page Main Portion ends here */}    
        </div>
    );
};

export default HomePage;