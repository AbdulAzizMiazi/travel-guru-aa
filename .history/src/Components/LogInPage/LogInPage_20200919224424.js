import React, { useContext, useState } from 'react';
import '../HomePage/HomePage.css';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Row, Col, Alert } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { userStatusContext } from '../../App';


//styling portion is here
const LogInPageStyle = {
    LogInPageStyle:{
        paddingTop: '8%',
        paddingBottom: '2%',
    },
    inputText:{
        color: 'grey',
        fontWeight: '500',
    },
    optionalBtn:{
        width: '100%',
        border:'1px solid black',
        borderRadius: '25px',
        padding: '5px 0px',
    },
    link:{
        color: 'rgb(255, 166, 0)',
        cursor: 'pointer',
        textDecoration: 'underline',
    }

}
//Styling portion ends here


//firebase initialization
firebase.initializeApp(firebaseConfig);


const LogInPage = () => {

    const[userStatus, setUserStatus] = useContext(userStatusContext); //Calling Context api
    console.log(userStatus);
    const[authCondition, setAuthCondition] = useState({});

    //things for private routing
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    //things for private routing ends here.....
    // & the rest thing is below.....

    const updatingAuthCondition = (boolean, message) =>{
        const authStatus = {
            authSuccess: boolean,
            authMessage: message,
        }
        setAuthCondition(authStatus);
    }

    //showing alert if password didn't match while creating a new account
    const [show, setShow] = useState(false);
    const myAlert = 
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Your Password didn't match</Alert.Heading>
        <p>Make sure that you type the same password in the 'confirmPassword' box which you gave in the 'password' box. </p>
    </Alert>;
    //showing alert ends here.....

    //Google LogIn starts here
    const loginWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider(); //declaring Google Provider
        const updateUserStatus = {...userStatus};
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            //updating userStatus
            updateUserStatus.email= user.email;
            updateUserStatus.authorized= user.email;
            updatingAuthCondition(true, "You've signed in successfully");
            history.replace(from); 
          })
        .catch(function(error) {
            var errorMessage = error.message;
            updatingAuthCondition(false, errorMessage);
        });
        setUserStatus(updateUserStatus);
    }
    //Google LogIn ends here.....


    //Facebook LogIn starts here
    const loginWithFacebook = () =>{
        const fbProvider = new firebase.auth.FacebookAuthProvider(); //declaring Facebook Provider
        const updateUserStatus = {...userStatus};
        firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then(function(result) {
            const user = result.user;
            //updating userStatus
            updateUserStatus.email= user.email;
            updateUserStatus.authorized= user.displayName;
            updatingAuthCondition(true, "You've signed in successfully");
            history.replace(from); 
        })
        .catch(function(error) {
            const errorMessage = error.message;
            updatingAuthCondition(false, errorMessage);
        });
        setUserStatus(updateUserStatus);
    }
    //Facebook LogIn ends here.....


    //"Declaring SignUp or SignIn option" starts here
    const signInOrSignUpDeclaration = (operationName) => {
        const updateUserStatus = {...userStatus};
        if (operationName === 'signIn') {
            updateUserStatus.isNewUser= false;
        }
        else if (operationName === 'signUp') {
            updateUserStatus.isNewUser= true;
        }
        setUserStatus(updateUserStatus);
    }
    //"Declaring SignUp or SignIn option" ends here.....


    //taking Inputs from inputFields and updating contextApi
    const takingFieldDataAndUpdatingContextAPI = e =>{ 
        const name = e.target.name;
        const value = e.target.value;
        let isInputFieldValid = true;

        //password and email validation
        if(name === 'email'){
            isInputFieldValid = /\S+@\S+\.\S+/.test(value);
            if (isInputFieldValid === true) {
                updatingAuthCondition(true, "  "); 
            }else{
                updatingAuthCondition(false, "Invalid email");
            }
        }
        if(name === 'password'){
            isInputFieldValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(value);
            //checking at least 6 characters(one number, one uppercase & one lowercase)
            console.log(isInputFieldValid);
            if (isInputFieldValid === true) {
                updatingAuthCondition(true, "  "); 
            }else{
                updatingAuthCondition(false, "Invalid password");
            }
        }
        if(name === 'confirmPassword'){
            if (userStatus.confirmPassword === userStatus.password) {
                setShow(false);
            }else{
                setShow(true);
            }
        }
        if (isInputFieldValid) {
            const userInfo = {...userStatus};
            userInfo[name] = value;
            setUserStatus(userInfo);
        }
    }
    //taking Inputs from inputFields and updating contextApi ends here.....


    //Sign in or Sign up Option starts from here
    const signUpOrSignInOperation = e => {

        // SigningIn of an already existing user
        if (userStatus.isNewUser === false ) {
            firebase
            .auth()
            .signInWithEmailAndPassword(userStatus.email, userStatus.password)
            .then( res =>{
                updatingAuthCondition(true, "You've signed in successfully");
                const updateUserStatus = {...userStatus};
                updateUserStatus.authorized= res.user.email;
                setUserStatus(updateUserStatus);
                history.replace(from); 
            })
            .catch(function(error) {
                const errorMessage = error.message;
                updatingAuthCondition(false, errorMessage)
            });           
        }

        //Creating a new User Account
        if (userStatus.isNewUser === true) {

            updatingAuthCondition(false, '');

            if (userStatus.confirmPassword === userStatus.password) { 
                setShow(false); 
                firebase
                .auth()
                .createUserWithEmailAndPassword(userStatus.email, userStatus.password)
                .then(res => {
                    const updateUserStatus = {...userStatus};
                    updateUserStatus.isNewUser= false;
                    updateUserStatus.authorized= res.user.email;   
                    // console.log("account created");
                    setUserStatus(updateUserStatus);
                    history.replace(from); 
                })
                .catch(function(error) {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
            }
            else{ setShow(true) }
        }
        
        e.preventDefault();
    }
    //Sign in or Sign up Option ends from here
    


    return (
        
        <div style={LogInPageStyle.LogInPageStyle}>
            <Row style={{marginRight:"0px"}}>
            <Col md={4}></Col>

            <Col sm={12} md={4}>

                { show && myAlert }
                {authCondition.authSuccess ===true && <p style={{color: 'green'}}>{authCondition.authMessage}</p> }
                {authCondition.authSuccess ===false && <p style={{color: 'red'}}>{authCondition.authMessage}</p> }

                {   /**Showing Conditionally 'Title'*/
                    userStatus.isNewUser 
                    ?<h3>Creat New Account</h3> 
                    :<h3>Login</h3>
                    /**Showing Conditionally ends here*/
                }

                <Form>
                <Form.Group >

                    {   /**Showing Conditionally 'Name Fields'*/
                        userStatus.isNewUser && <div>
                            <Form.Label style={LogInPageStyle.inputText}>First Name</Form.Label>
                            <Form.Control type="text" name="fName" onBlur={takingFieldDataAndUpdatingContextAPI} />
                            <br/>
                            <Form.Label style={LogInPageStyle.inputText}>Last Name</Form.Label>
                            <Form.Control type="text" name="lName" onBlur={takingFieldDataAndUpdatingContextAPI} />
                            <br/>
                        </div>
                        /**Showing Conditionally ends here*/
                    }
                    <Form.Label style={LogInPageStyle.inputText}>Email{userStatus.isNewUser && <span style={{color:'red'}}>*</span>}</Form.Label>
                    <Form.Control type="email" name="email" onBlur={takingFieldDataAndUpdatingContextAPI} required />
                    <br/>

                    <Form.Label style={LogInPageStyle.inputText}>Password{userStatus.isNewUser && <span style={{color:'red'}}>*</span>}</Form.Label>
                    <Form.Control type="password" name="password" onBlur={takingFieldDataAndUpdatingContextAPI} required />

                    {userStatus.isNewUser && <p><small>Password must have 6 characters<i>(1 number, 1 uppercase and 1 lowercase)</i></small></p> }

                    {   /**Showing Conditionally 'confirm password' filed*/
                        userStatus.isNewUser && <div>
                            <Form.Label style={LogInPageStyle.inputText}>Confirm Password<span style={{color:'red'}}>*</span></Form.Label>
                            <Form.Control type="password" name="confirmPassword" onBlur={takingFieldDataAndUpdatingContextAPI} required />
                        </div>
                        /**Showing Conditionally ends here*/
                    }
                    <Row>
                        <Col sm={7}>
                            <Form.Check
                            type="checkbox"
                            id="customControlAutosizing"
                            label="Remember Me"
                            custom
                            />
                        </Col>
                        <Col sm={5}> 
                            <Link style={{color: 'rgb(255, 166, 0)'}}><p>Forget Password?</p></Link>
                        </Col>
                    </Row>
                </Form.Group>
                    <button className="myBtn" style={{width: '100%'}} onClick={signUpOrSignInOperation}>
                        {   /**Showing Conditionally 'Button Name'*/
                            userStatus.isNewUser 
                            ?'Creat New account' 
                            :'Login'
                            /**Showing Conditionally ends here*/
                        }
                    </button>
                </Form>
                    <br/>
                    <br/>
                {
                    userStatus.isNewUser 
                    ?<p>Already have an Account? <span style={LogInPageStyle.link} onClick={()=>signInOrSignUpDeclaration('signIn')}>Login</span></p>
                    :<p>Don't you have an Account? <span style={LogInPageStyle.link} onClick={()=>signInOrSignUpDeclaration('signUp')}>Creat New Account</span></p> 
                }
                
                <br/>

                <button style={LogInPageStyle.optionalBtn} onClick={loginWithFacebook} className="mb-2">
                    Login with Facebook
                </button>
                <br/>

                <button style={LogInPageStyle.optionalBtn} onClick={loginWithGoogle}>
                    <Row>
                        <Col sm={3}>
                            <img src='../../images/Icon/google.png' alt=""/>
                        </Col>
                        <Col sm={9}>
                            Login with Google
                        </Col>
                    </Row>
                </button>

            </Col>
            <Col md={4}></Col>
            </Row>
        </div>
    );
};

export default LogInPage;