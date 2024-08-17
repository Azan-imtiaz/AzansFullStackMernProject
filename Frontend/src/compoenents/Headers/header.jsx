import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
let Header=()=>{
    return(
<>
<Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link> <Link  style={{color:"#9e9e9e",textDecoration:"none"}} to="/">Home</Link></Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/azan-imtiaz-818471234">Developer</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
</>

    );
}

export default Header;