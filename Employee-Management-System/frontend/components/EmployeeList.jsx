import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../services/employeeService";
import { Table, Button, Form, Modal, Badge, Pagination } from "react-bootstrap";

const EmployeeList = ({ refreshKey, showToast }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      showToast("Failed to load employees ❌", "danger");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      showToast("Employee deleted successfully 🗑️", "warning");
      loadEmployees();
    } catch (err) {
      showToast("Failed to delete employee ❌", "danger");
    }
  };

  const handleEditOpen = (emp) => {
    setEditEmployee(emp);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(editEmployee.id, {
        ...editEmployee,
        salary: Number(editEmployee.salary)
      });

      setShowModal(false);
      showToast("Employee updated successfully ✨", "success");
      loadEmployees();
    } catch (err) {
      showToast("Failed to update employee ❌", "danger");
    }
  };

  // Search Filter
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        />
        {items}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        />
      </Pagination>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded p-3 border-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">
          <i className="bi bi-card-list me-2 text-success"></i>
          Employee List{" "}
          <Badge bg="secondary">{filteredEmployees.length}</Badge>
        </h5>

        <Form.Control
          style={{ width: "280px" }}
          type="text"
          placeholder="Search name / email / dept..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No employees found ❌
                </td>
              </tr>
            ) : (
              currentEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td className="fw-semibold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <Badge bg="info" className="text-dark">
                      {emp.department}
                    </Badge>
                  </td>
                  <td>₹ {emp.salary}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditOpen(emp)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-fill me-2 text-primary"></i>
            Edit Employee
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editEmployee.name}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editEmployee.email}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={editEmployee.department}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={editEmployee.salary}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;
