import React from 'react';
import { Container } from 'react-bootstrap';

const Content = () => {
  return (
    <Container fluid className="content">
      <h1>Welcome to your Dashboard</h1>
      <p>This is the main content area. Select an item from the sidebar to get started.</p>
    </Container>
  );
};

export default Content;
