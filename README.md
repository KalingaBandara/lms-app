# LMS App

This is a Learning Management System (LMS) web application.

## Endpoints
Users API (/api/users)

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | `/`            | Create a new user  |
| GET    | `/profile/:id` | Get user's profile |
| GET    | `/`            | Get all users      |
| GET    | `/:id`         | Get user by ID     |
| PUT    | `/:id`         | Update user by ID  |
| DELETE | `/:id`         | Delete user by ID  |


Teachers API (/api/teachers)

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | `/`            | Create a new teacher  |
| GET    | `/profile/:id` | Get teacher's profile |
| GET    | `/`            | Get all teachers      |
| GET    | `/:id`         | Get Teacher by ID     |
| PUT    | `/:id`         | Update Teacher by ID  |
| DELETE | `/:id`         | Delete Teacher by ID  |

Courses API (/api/courses)

| Method | Endpoint                                |   Description                   |
| ------ | ----------------------------------------| --------------------------------|
| POST   | `/`                                     | Create a new course             |
| GET    | `/`                                     | Get all courses                 |
| GET    | `/:id`                                  | Get Course by ID                |
| PUT    | `/:id`                                  | Update Course by ID             |
| DELETE | `/:id`                                  | Delete Course by ID             |
| PUT    | `/enrollUser/:courseId/:userId`         | Enroll a user in a course       |
| PUT    | `/unenrollUser/:courseId/:userId`       | Unenroll a user from a course   |
| PUT    | `/enrollTeacher/:courseId/:teacherId`   | Enroll a teacher in a course    |
| PUT    | `/unenrollTeacher/:courseId/:teacherId` | Unenroll a teacher from a course|



## For Unit Tests:
```bash
npm run test:unit
```

## For Integration Tests:
```bash
npm run test:integration
```
## For E2E Tests:
```bash
npm run test:e2e
```
## To run the application:
```bash
npm run docker:up
```

## To run all Tests:
```bash
npm run test
```
