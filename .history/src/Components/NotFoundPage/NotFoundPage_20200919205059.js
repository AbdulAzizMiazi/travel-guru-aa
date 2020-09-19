import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userStatusContext } from '../../App';
import notFoundImage from './404_v2.webp';
import './notFoundPage.css'



const NotFoundPage = () => {

    const[userStatus, setUserStatus] = useContext(userStatusContext)
    //changing the page name after loading the page
    const onWindowLoad = ()=>{
        const updateContext = {...userStatus};
        updateContext.pageName = "NotFoundPage";
        setUserStatus(updateContext);
    }
    window.onload = onWindowLoad;
    
    return (
        <div className="pictureSetUp">
            <img src={notFoundImage} alt=""/>
            <Link to="/"><button><b>Go to home Page</b></button> </Link>
        </div>
    );
};

export default NotFoundPage;