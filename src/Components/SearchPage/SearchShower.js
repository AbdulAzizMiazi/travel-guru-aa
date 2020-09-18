import React from 'react';
import {Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const SearchShower = ({data}) => {
    const {image, rating, ratedBy, price, name} = data;
    return (
        <Row className="mb-5">
            <Col sm={12} md={6}>
                <img src={image} alt="" width="100%"/>
            </Col>
            <Col sm={12} md={6}>
                <h4 className="mb-3">{name}</h4>
                <pre style={{color: 'gray'}}>4 guests  2 bedrooms  2 beds  2baths</pre>
                <p style={{color: 'gray'}}>Wifi Air conditioning kitchen</p>
                <p style={{color: 'gray'}}>Cancellation flexibility available</p>
                
                <p style={{color: 'black'}}>
                    <Row>
                        <Col sm={8}>
                        <FontAwesomeIcon icon={faStar} style={{color: 'rgb(255, 145, 0)'}}/>{rating}({ratedBy})
                        </Col>
                        <Col sm={4}>
                            ${price}/night
                        </Col>
                    </Row>
                </p>
            </Col>
            <hr/>            
        </Row>
    );
};

export default SearchShower;