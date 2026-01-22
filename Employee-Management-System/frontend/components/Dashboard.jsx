import React, { useEffect, useMemo, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { Card, Row, Col, Badge, Table } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

// ✅ Different colors for departments
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4D4D",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#795548"
];

const Dashboard = ({ refreshKey, showToast }) => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      showToast("Dashboard load failed ❌", "danger");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [refreshKey]);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;

    const deptMap = {};
    let totalSalary = 0;
    let maxSalary = 0;

    employees.forEach((e) => {
      totalSalary += Number(e.salary || 0);
      maxSalary = Math.max(maxSalary, Number(e.salary || 0));

      const dept = e.department || "Unknown";
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });

    const totalDepartments = Object.keys(deptMap).length;
    const avgSalary = totalEmployees === 0 ? 0 : totalSalary / totalEmployees;

    const departmentCounts = Object.entries(deptMap)
      .map(([department, count]) => ({ department, count }))
      .sort((a, b) => b.count - a.count);

    const pieData = departmentCounts.map((d) => ({
      name: d.department,
      value: d.count
    }));

    return {
      totalEmployees,
      totalDepartments,
      maxSalary,
      avgSalary,
      departmentCounts,
      pieData
    };
  }, [employees]);

  return (
    <div>
      <h4 className="fw-bold mb-3">
        <i className="bi bi-speedometer2 me-2 text-primary"></i>
        Dashboard
      </h4>

      {/* ✅ Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <p className="text-muted mb-1">Total Employees</p>
              <h3 className="fw-bold">{stats.totalEmployees}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <p className="text-muted mb-1">Departments</p>
              <h3 className="fw-bold">{stats.totalDepartments}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <p className="text-muted mb-1">Highest Salary</p>
              <h3 className="fw-bold">₹ {Math.round(stats.maxSalary)}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <p className="text-muted mb-1">Average Salary</p>
              <h3 className="fw-bold">₹ {Math.round(stats.avgSalary)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Chart + Table */}
      <Row className="g-3">
        {/* ✅ Pie Chart */}
        <Col lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-pie-chart-fill me-2 text-success"></i>
                Department Chart
              </h5>

              {stats.pieData.length === 0 ? (
                <p className="text-muted mb-0">No data to show...</p>
              ) : (
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={stats.pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {stats.pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ✅ Department Summary Table */}
        <Col lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-building me-2 text-info"></i>
                Department Summary
              </h5>

              {stats.departmentCounts.length === 0 ? (
                <p className="text-muted mb-0">No employees yet...</p>
              ) : (
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Department</th>
                      <th>Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.departmentCounts.map((d) => (
                      <tr key={d.department}>
                        <td>
                          <Badge bg="info" className="text-dark">
                            {d.department}
                          </Badge>
                        </td>
                        <td className="fw-semibold">{d.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
