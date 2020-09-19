import React from 'react';
import notFoundImage from './404_v2.webp';
import './notFoundPage.css'



const NotFoundPage = () => {
    return (
        <div className="pictureSetUp">
            <img src={notFoundImage} alt=""/>
        </div>
    );
};

export default NotFoundPage;