import React from 'react';
import notFoundImage from './404_v2.webp';

const pictureSetUp ={
    marginLeft: '50%',
    MarginTop: '5%',
    width: '50%',
}

const NotFoundPage = () => {
    return (
        <div>
            <img src={notFoundImage} className={pictureSetUp} alt=""/>
        </div>
    );
};

export default NotFoundPage;