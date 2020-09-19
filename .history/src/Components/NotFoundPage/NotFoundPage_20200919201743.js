import React from 'react';
import notFoundImage from './404_v2.webp';

const pictureSetUp ={
    marginLeft: '',
    MarginTop: '5%',
    width: '50vw',
}

const NotFoundPage = () => {
    return (
        <div>
            <img src={notFoundImage} className={pictureSetUp} alt=""/>
        </div>
    );
};

export default NotFoundPage;