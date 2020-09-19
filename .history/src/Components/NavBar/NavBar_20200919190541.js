import React from 'react';
import logo from '../../images/Logo.png';
import '../HomePage/HomePage.css';
import { Link } from "react-router-dom";
import { Form, FormControl, Nav, Navbar, Container, Button} from 'react-bootstrap';

const NavBar = () => {
    const NavLinksClassVersion = "ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks";
    return (
        <div>
            <Container className="fixed-top">
            <Navbar className="myNavStyle">
            <Navbar.Brand href="#home"><img src={logo} alt="" className="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="ml-sm-2 ml-md-auto">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 border border-white rounded-pill mySearchStyle"/>
                <Button variant="outline-light" className="border border-white rounded-pill">Search</Button>
                </Form>
                <Nav>
                <Nav.Link href="#" className={NavLinksClassVersion}>News</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Destination</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Blog</Nav.Link>
                <Nav.Link href="#" className={NavLinksClassVersion}>Contact</Nav.Link>
                <Link to="/login">
                    <button className="ml-sm-2 ml-3 mr-sm-2 mr-3 myBtn">Login</button>
                </Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <hr/>
            </Container>
        </div>
    );
};

export default NavBar;