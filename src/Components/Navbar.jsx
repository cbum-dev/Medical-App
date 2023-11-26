// src/components/Navbar.js
import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
// import useUserRole from '../Utils/CheckUser';

export function CustomNavbar() {
  // const userRole = useUserRole();
  const [isAuth, setIsAuth] = useState(false);   
  useEffect(() => {     
      if (localStorage.getItem('access_token') !== null) {        
          setIsAuth(true); 
    }
  }, [isAuth]);
  return (
    <Navbar className = "navvy py-2 sticky-top" style={{backgroundColor : '#0a0f3d'}} variant="dark" expand="lg" >
      <Navbar.Brand style={{paddingLeft : '10px',fontWeight : 'bold' }} href="#">MedTalk</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto d-flex justify-content-center">
          <Nav.Link  href="/">Home</Nav.Link>
          <Link to ="/blog" className="nav-link">Blog</Link>
          {isAuth && (
            <>
              <Link to="/record" className="nav-link">View Reports</Link>
              <Link to="/book" className="nav-link">View Appointments</Link>
            </>
          )}
          <Nav.Link href="#Help">Help Center</Nav.Link>
        </Nav>
        {/* <Nav style={{display: 'flex',alignItems: 'center',marginLeft: 'auto'}}> */}
        <Nav style={{position:'right'}}>
          {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
        {/* <nav>
        {userRole === 'normal_user' && (
          <Link to="/provider-features">Provider Features</Link>
        )}
      </nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

// export default CustomNavbar;
