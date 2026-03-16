# Student Task & Deadline Tracker

## Overview
The **Student Task & Deadline Tracker** is a full-stack web application designed to help students manage their academic tasks, assignments, and project deadlines efficiently. It provides a centralized platform where users can create tasks, monitor deadlines, and track the completion status of their work.

This application demonstrates the core concepts of **Java Full Stack Development** by integrating a **React frontend**, **Spring Boot backend**, and **MySQL database**.

The system helps students stay organized and improves time management by automatically identifying overdue tasks and allowing users to update task statuses easily.

---

## Features

- User Registration and Login with JWT Authentication
- Create academic tasks with title, subject, description, and deadline
- Update task status (Pending / Completed)
- Automatic detection of overdue tasks
- Responsive user interface for easy task management
- Secure REST API communication between frontend and backend

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication

### Database
- MySQL

### Tools
- Git
- GitHub
- Maven
- Postman

---

## Project Structure

```
Student-Task-Deadline-Tracker
│
├── std-frontend
│   └── React application
│
├── std-backend
│   └── Spring Boot application
│
├── README.md
└── .gitignore
```

---

## System Workflow

1. User registers and logs into the system.
2. The frontend sends authentication requests to the Spring Boot backend.
3. Backend validates the user and returns a JWT token.
4. Users can create, update, and manage their tasks.
5. Tasks are stored in the MySQL database.
6. The system checks deadlines and highlights overdue tasks.

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/krishnakulkarni-24/Student-Task-Deadline-Tracker.git
```

---

## Backend Setup (Spring Boot)

Navigate to backend folder:

```bash
cd std-backend
```

Configure database in:

```
src/main/resources/application.properties
```

Example configuration:

```
spring.datasource.url=jdbc:mysql://localhost:3306/tasktracker
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## Frontend Setup (React)

Navigate to frontend folder:

```bash
cd std-frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Future Improvements

- Email reminders for upcoming deadlines
- Calendar view for tasks
- Task prioritization
- Notifications for overdue tasks
- Mobile-friendly UI improvements

---

## Author

**Sri Krishna Kulkarni**
