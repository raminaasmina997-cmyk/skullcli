import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="/home">Dashboard</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/customers">Customers</Nav.Link>
        <Nav.Link href="/reports">Reports</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
