const request = require('supertest');

describe('End-to-End Test 1: User, Course, Enrollment, Deletion', () => {
  let userId;
  let courseId;

  test('Create a new user', async () => {
    const res = await request("http://localhost:3000")
      .post("/api/users")
      .send({ name: 'Test User', email: 'testuser@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test User');
    userId = res.body._id.toString();
  });

  it('Create a new course', async () => {
    const res = await request("http://localhost:3000")
      .post("/api/courses")
      .send({ title: 'Test Course 1', description: 'A test course' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Course 1');
    courseId = res.body._id.toString();
  });

  it('Enroll user in course', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/courses/enrollUser/${courseId}/${userId}`)

    expect(res.statusCode).toBe(200);
  });

  it('Update user name', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/users/${userId}`)
      .send({ name: 'Test User Updated', email: 'test@gmail.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.updatedUser._id).toBe(userId);
  });

  it('Update course name', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/courses/${courseId}`)
      .send({ title: 'Test Course Updated', description: 'A test course' });

    expect(res.statusCode).toBe(200);
  });

  it('Delete the created course', async () => {
    const res = await request("http://localhost:3000")
      .delete(`/api/courses/${courseId}`)

    expect(res.statusCode).toBe(200);
  });

  it('Delete the created user', async () => {
    const res = await request("http://localhost:3000")
      .delete(`/api/users/${userId}`)

    expect(res.statusCode).toBe(200);
  });

});

describe('End-to-End Test 2: Teacher, Course, Enrollment, Deletion', () => {
  let teacherId;
  let courseId;

  test('Create a new teacher', async () => {
    const res = await request("http://localhost:3000")
      .post("/api/teachers")
      .send({ name: 'Test Teacher', email: 'testuser@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Teacher');
    teacherId = res.body._id.toString();
  });

  it('Create a new course', async () => {
    const res = await request("http://localhost:3000")
      .post("/api/courses")
      .send({ title: 'Test Course 1', description: 'A test course' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Course 1');
    courseId = res.body._id.toString();
  });

  it('Enroll teacher in course', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/courses/enrollTeacher/${courseId}/${teacherId}`)

    expect(res.statusCode).toBe(200);
  });

  it('Update teacher name', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/teachers/${teacherId}`)
      .send({ name: 'Test Teacher Updated', email: 'test@gmail.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.updatedTeacher._id).toBe(teacherId);
  });

  it('Update course name', async () => {
    const res = await request("http://localhost:3000")
      .put(`/api/courses/${courseId}`)
      .send({ title: 'Test Course Updated', description: 'A test course' });

    expect(res.statusCode).toBe(200);
    expect(res.body.updatedCourse._id).toBe(courseId);
  });

  it('Delete the created course', async () => {
    const res = await request("http://localhost:3000")
      .delete(`/api/courses/${courseId}`)

    expect(res.statusCode).toBe(200);
  });

  it('Delete the created teacher', async () => {
    const res = await request("http://localhost:3000")
      .delete(`/api/teachers/${teacherId}`)

    expect(res.statusCode).toBe(200);
  });


});
