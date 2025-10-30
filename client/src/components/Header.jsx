import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <NavDropdown title={
            <>
              <Image src="https://i.pravatar.cc/40" roundedCircle className="me-2" />
              Jimmy
            </>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Activity Log</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
