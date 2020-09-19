import React, { useContext } from 'react';
import logo from '../../images/Logo.png';
import '../HomePage/HomePage.css';
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import { Form, FormControl, Nav, Navbar, Container, Button} from 'react-bootstrap';
import { userStatusContext } from '../../App';

const NavBar = () => {   
    const[userStatus, setUserStatus] = useContext(userStatusContext);

    //signOut operation starts from here
    const signOut = () => {
        firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
        })
        .catch(function(error) {
        // An error happened.
        });

        //deleting authorized property
        const updateUserStatus = {...userStatus};      
        delete updateUserStatus.authorized;
        setUserStatus(updateUserStatus);
    }
    //signOut operation ends from here.....

    const NavLinksClassVersion = "ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks font-weight-bold text-secondary";
    
    return (
        <div>
            <Container className="fixed-top">
            <Navbar className="myNavStyle">
            <Navbar.Brand><Link to="/"><img src={logo} alt="" className="logo"/></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="ml-sm-2 ml-md-auto">
                <FormControl variant="outline-secondary" type="text" placeholder="Search here..." className="mr-sm-2 border rounded-pill mySearchStyle"/>
                <Button variant="outline-secondary" className="border rounded-pill font-weight-bold">Search</Button>
                </Form>
                <Nav>
                <Nav.Link href="#" className={NavLinksClassVersion}>News</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Destination</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Blog</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Contact</Nav.Link>
                {
                    userStatus.authorized 
                    ?   <button className="ml-sm-2 ml-3 mr-sm-2 mr-3 myBtn" onClick={signOut}>Logout</button>
                    :   <Link to="/login"><button className="ml-sm-2 ml-3 mr-sm-2 mr-3 myBtn">Login</button></Link>
                }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <hr/>
            </Container>
        </div>
    );
};

export default NavBar;