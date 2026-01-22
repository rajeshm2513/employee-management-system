import React, { useState } from "react";
import { addEmployee } from "../services/employeeService";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const EmployeeForm = ({ refresh, showToast }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEmployee({
        ...employee,
        salary: Number(employee.salary)
      });

      setEmployee({ name: "", email: "", department: "", salary: "" });
      refresh();
      showToast("Employee added successfully ✅", "success");
    } catch (err) {
      showToast("Failed to add employee ❌", "danger");
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fw-bold mb-3">
          <i className="bi bi-person-plus-fill me-2 text-primary"></i>
          Add Employee
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="text"
                name="department"
                placeholder="Enter Department"
                value={employee.department}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="number"
                name="salary"
                placeholder="Enter Salary"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={12}>
              <Button type="submit" variant="primary" className="w-100 fw-bold">
                <i className="bi bi-save2 me-2"></i>
                Save Employee
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EmployeeForm;
