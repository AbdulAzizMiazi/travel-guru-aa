import React from 'react';
import logo from '../../images/Logo.png';
import '../HomePage/HomePage.css';
import { Form, FormControl, Nav, Navbar, Container, Button} from 'react-bootstrap';

const NavBar = () => {
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
                <Nav.Link href="#" className="ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks">News</Nav.Link>
                <Nav.Link href="#" className="ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks">Destination</Nav.Link>
                <Nav.Link href="#" className="ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks">Blog</Nav.Link>
                <Nav.Link href="#" className="ml-sm-2 ml-3 mr-sm-2 mr-3 navLinks">Contact</Nav.Link>
                <button className="ml-sm-2 ml-3 mr-sm-2 mr-3 myBtn">Login</button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </Container>
            <hr/>
        </div>
    );
};

export default NavBar;