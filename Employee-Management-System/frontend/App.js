import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import { Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  const refresh = () => setRefreshKey((prev) => prev + 1);

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "success" }), 2500);
  };

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        {/* ✅ Dashboard */}
        <Dashboard refreshKey={refreshKey} showToast={showToast} />

        <hr className="my-4" />

        {/* ✅ Form + List */}
        <Row className="g-4">
          <Col lg={4}>
            <EmployeeForm refresh={refresh} showToast={showToast} />
          </Col>

          <Col lg={8}>
            <EmployeeList refreshKey={refreshKey} showToast={showToast} />
          </Col>
        </Row>
      </Container>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast bg={toast.variant} show={toast.show}>
          <Toast.Body className="text-white fw-semibold">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
