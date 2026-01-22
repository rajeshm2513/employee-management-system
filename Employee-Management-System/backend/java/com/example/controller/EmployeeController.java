package com.example.controller;

import com.example.entity.Employee;
import com.example.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;

    // ✅ Constructor Injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // ✅ Create Employee
    @PostMapping
    public Employee create(@Valid @RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    // ✅ Get All Employees
    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    // ✅ Get Employee By Id
    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return employeeService.getById(id);
    }

    // ✅ Update Employee
    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        return employeeService.update(id, employee);
    }

    // ✅ Delete Employee
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        employeeService.delete(id);
        return "Employee deleted successfully!";
    }

    // ✅ Get Employees By Department
    @GetMapping("/department/{department}")
    public List<Employee> getByDepartment(@PathVariable String department) {
        return employeeService.getByDepartment(department);
    }
}
