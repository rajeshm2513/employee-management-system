📌 Employee Management System (Full Stack)

A **Full Stack Employee Management System** built using **Spring Boot (REST API)** and **React** with **MySQL** database.
It supports **CRUD operations**, **Dashboard Analytics**, **Department Pie Chart**, **Search**, and **Pagination**.

🚀Features

>>Backend (Spring Boot)<<

* REST APIs for Employee Management
* CRUD Operations (Create / Read / Update / Delete)
* Validation using `jakarta.validation`
* MySQL Database Integration
* Spring Data JPA + Hibernate ORM

>>Frontend (React)<<

* Modern UI with Bootstrap
* Add / Update / Delete Employees
* Search Employees by Name / Department
* Pagination for employee list
* Dashboard with:

  * Total Employees
  * Total Departments
  * Highest Salary
  * Average Salary
* Department-wise **Pie Chart** (different colors for each department)

>>🛠️ Tech Stack<<

**Frontend:** React, Axios, Bootstrap, Recharts
**Backend:** Java, Spring Boot, Spring Data JPA, Hibernate
**Database:** MySQL
**Tools:** Git, GitHub, Postman, STS / VS Code

📂 Project Structure

employee-management-system
 ├── backend      (Spring Boot)
 └── frontend     (React)

⚙️ Setup Instructions

1) Backend Setup (Spring Boot)

📌 Go to backend folder:

```bash
cd backend
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run Backend:

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

2) Frontend Setup (React)

📌 Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm start
```

Frontend will start at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/employees`      | Create Employee    |
| GET    | `/api/employees`      | Get All Employees  |
| GET    | `/api/employees/{id}` | Get Employee By ID |
| PUT    | `/api/employees/{id}` | Update Employee    |
| DELETE | `/api/employees/{id}` | Delete Employee    |

---

##📸 Screenshots

You can add screenshots here:

* Dashboard
<img width="1334" height="604" alt="image" src="https://github.com/user-attachments/assets/2203b1b2-b065-4f6d-b6bc-03a692b773d7" />

* Employee List
* <img width="835" height="544" alt="image" src="https://github.com/user-attachments/assets/a3542834-2f49-495c-97f3-e0900acca5ae" />

* Add Employee Form
* <img width="370" height="210" alt="image" src="https://github.com/user-attachments/assets/56c67577-0a93-4fbb-8ceb-179464cb26b0" />

* Pie Chart
* <img width="527" height="304" alt="image" src="https://github.com/user-attachments/assets/403b9924-daa8-4455-a889-ff136150cbf7" />


$$ 👨‍💻 Author
**Rajesh Naik Mudavath**
GitHub Profile: https://github.com/rajeshm2513  
Project Repo: https://github.com/rajeshm2513/employee-management-system
