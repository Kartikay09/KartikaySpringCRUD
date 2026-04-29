# KartikaySpringCRUD
# Spring Boot JDBC CRUD Application

## Overview

Spring Boot application using JDBC (JdbcTemplate) with PostgreSQL.
Includes a simple frontend to perform CRUD operations.

## Tech Stack

Java
Spring Boot
Spring JDBC (JdbcTemplate)
PostgreSQL
HTML, CSS, JavaScript
Maven

## Project Structure

```
KartikaySpringCRUD
│
├── src/main/java/com/example/KartikaySpringCRUD/
│   ├── KartikaySpringCrudApplication.java
│   ├── controller/
│   │   └── StudentController.java
│   ├── service/
│   │   └── StudentService.java
│   ├── repository/
│   │   └── StudentRepository.java
│   └── model/
│       └── Student.java
│
├── src/main/resources/
│   ├── static/
│   │   └── index.html
│   └── application.properties
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## Database Setup

Create database:

```
CREATE DATABASE crud;
```

Create table:

```
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    course VARCHAR(100)
);
```

## Configuration

application.properties:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/crud
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
```

## Run Application

```
mvn spring-boot:run
```

or

```
.\mvnw.cmd spring-boot:run
```

## API Endpoints

POST /students
GET /students
GET /students/{id}
PUT /students/{id}
DELETE /students/{id}

## Frontend

Open in browser:

```
http://localhost:8080/index.html
```

The frontend allows:

* Add student
* View all students
* Update student
* Delete student

## Example Request

POST /students

```
{
  "name": "Kartikay",
  "email": "kartikay@gmail.com",
  "course": "CSE"
}
```

## Architecture

Controller -> Service -> Repository -> Database
