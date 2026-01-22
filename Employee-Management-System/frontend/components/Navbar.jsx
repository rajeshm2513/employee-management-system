import React from "react";
import { Navbar, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand className="fw-bold">
          <i className="bi bi-people-fill me-2"></i>
          Employee Management System
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
