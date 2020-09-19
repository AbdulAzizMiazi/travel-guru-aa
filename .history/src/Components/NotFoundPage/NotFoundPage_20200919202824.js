import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from './404_v2.webp';
import './notFoundPage.css'



const NotFoundPage = () => {
    return (
        <div className="pictureSetUp">
            <img src={notFoundImage} alt=""/>
            <Link to="/"><button><b>Go to home Page</b></button> </Link>
        </div>
    );
};

export default NotFoundPage;