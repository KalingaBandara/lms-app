const mongoose = require("mongoose");
const request = require("supertest");
const dbHandler = require('../in-memory-db-handler.js');
const app = require("../../src/app.js");

// const courseService = require('../src/services/course.service');
const User = require('../../src/models/user.model.js');
const Teacher = require('../../src/models/teacher.model.js');
const Course = require('../../src/models/course.model.js');


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe("POST /api/courses", () => {
    it("should create a new course", async () => {
        const res = await request(app)
        .post("/api/courses")
        .send({ title: "Test Course", description: "This a test course description" });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.title).toBe("Test Course");
        expect(res.body.description).toBe("This a test course description");
    });

    it("should handle empty course title", async () => {
        const res = await request(app)
        .post("/api/courses")
        .send({ title: "", description: "This a test course description" });
        
        expect(res.statusCode).toBe(422);
    });

     it("should handle duplicate course title", async () => {
        await request(app)
        .post("/api/courses")
        .send({ title: "Test Course", description: "This a test course description" });

        const res2 = await request(app)
        .post("/api/courses")
        .send({ title: "Test Course", description: "This a test course description of attempt 2" });
        
        expect(res2.statusCode).toBe(400);
    });

    it("should validate request body to have title and description only", async () => {
        const res = await request(app)
        .post("/api/courses")
        .send({ title: "test course", description: "this is a test course", class:"Level 3" });
        
        expect(res.statusCode).toBe(422);
    });

    it("should validate title to have at least 3 characters", async () => {
        const res = await request(app)
        .post("/api/courses")
        .send({ title: "ab", description: "two letter course" });
        
        expect(res.statusCode).toBe(422);
    });

    
});

describe("GET /api/courses", () => {
    it("should fetch empty list of courses when no course is added", async () => {
        // await request(app)
        // .post("/api/courses")
        // .send({ title: "Test Course", description: "This a test course decription" });

        const res = await request(app)
        .get("/api/courses")
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body).toEqual([]);
        expect(res.body).toBeInstanceOf(Array);
    });

     it("should fetch list of users when users present", async () => {
            
            await Course.create({ title: "Test Course", description: "A test course description" });
    
            const res = await request(app)
            .get("/api/courses")
            expect(res.statusCode).toBe(200);
            expect(res.body).not.toBeEmpty;
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                title: "Test Course",
                description: "A test course description"
                })
            ])
    );
});
    
});

describe("GET /api/courses/:id", () => {
    it("should fetch the course correspoding to given ID", async () => {
        // const res1 = await request(app)
        // .post("/api/teachers")
        // .send({ name: "testTeacher", email: "test@gmail.com" });
        // expect(res1.statusCode).toBe(201);

        // const teacherId = res1._body._id;
        // console.log(teacherId);
      
        const testCourse = await Course.create({ title: "Test Course", description: "This a test course description" });
        const courseId = testCourse._id.toString();

        const res = await request(app)
        .get(`/api/courses/${courseId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body._id).toBe(courseId);

    });

    it("should handle fetching when requested course ID is not avaiable", async () => {
        const courseId = require('node:crypto').randomBytes(12).toString('hex');

        const res = await request(app)
        .get(`/api/courses/${courseId}`)
        expect(res.statusCode).toBe(404);
        expect(res.body).toBeEmpty;

    });
});

describe("PUT /api/courses/:id", () => {
    it("should update the name of course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const res = await request(app)
        .put(`/api/courses/${courseId}`)
        .send({ title: "testCourse2", description: "this is a test course" });

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.updatedCourse._id).toBe(courseId);

        const updated = await Course.findById(courseId);
        expect(updated.title).toBe("testCourse2");

    });
});

describe("DELETE /api/courses/:id", () => {
    it("should delete the course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const res = await request(app)
        .delete(`/api/courses/${courseId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.deletedCourse._id).toBe(courseId);
        expect(res.body.deletedCourse.title).toBe("testCourse");
        expect(res.body.deletedCourse.description).toBe("this is a test course");

        const deleted = await Course.findById(courseId);
        expect(deleted).toBeNull();
    });
});

describe("PUT /api/courses/enrollUser/:courseId/:userId", () => {
    it("should enroll a user to the course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const testUser = await User.create({ name: "testUser", email: "testuser@gmail.com" });
        const userId = testUser._id.toString();

        const res = await request(app)
        .put(`/api/courses/enrollUser/${courseId}/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.enrolledCourse._id).toBe(courseId);
        expect(res.body.enrolledCourse.enrolledUsers.includes(userId));

        const enrolledCourse = await Course.findById(courseId);
        expect(enrolledCourse.enrolledUsers.includes(userId));

        const enrolledUser = await User.findById(userId);
        expect(enrolledUser.enrolledCourses.includes(courseId));

    });
});

describe("PUT /api/courses/unenrollUser/:courseId/:userId", () => {
    it("should unenroll a user to the course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const testUser = await User.create({ name: "testUser", email: "testuser@gmail.com" });
        const userId = testUser._id.toString();

        // Enroll the user manually via schema (not API)
        testCourse.enrolledUsers.push(userId);
        await testCourse.save();

        testUser.enrolledCourses.push(courseId);
        await testUser.save();

        const res = await request(app)
        .put(`/api/courses/unenrollUser/${courseId}/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.unenrolledCourse._id).toBe(courseId);
        expect(res.body.unenrolledCourse.enrolledUsers.includes(userId));

        // Validate in DB
        const updatedCourse = await Course.findById(courseId);
        expect(updatedCourse.enrolledUsers.includes(userId)).toBe(false);

        const updatedUser = await User.findById(userId);
        expect(updatedUser.enrolledCourses.includes(courseId)).toBe(false);
    });
});

describe("PUT /api/courses/enrollTeacher/:courseId/:teacherId", () => {
    it("should enroll a teacher to the course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const testTeacher = await Teacher.create({ name: "testTeacher", email: "testteacher@gmail.com" });
        const teacherId = testTeacher._id.toString();

        const res = await request(app)
        .put(`/api/courses/enrollTeacher/${courseId}/${teacherId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.enrolledCourse._id).toBe(courseId);
        expect(res.body.enrolledCourse.enrolledTeachers.includes(teacherId));

        const enrolledCourse = await Course.findById(courseId);
        expect(enrolledCourse.enrolledTeachers.includes(teacherId));

        const enrolledTeacher = await Teacher.findById(teacherId);
        expect(enrolledTeacher.enrolledCourses.includes(courseId));
    });
});

describe("PUT /api/courses/unenrollTeacher/:courseId/:teacherId", () => {
    it("should unenroll a teacher to the course", async () => {
        
        const testCourse = await Course.create({ title: "testCourse", description: "this is a test course" });
        const courseId = testCourse._id.toString();

        const testTeacher = await Teacher.create({ name: "testTeacher", email: "testteacher@gmail.com" });
        const teacherId = testTeacher._id.toString();

        // Enroll the teacher manually via schema (not API)
        testCourse.enrolledTeachers.push(teacherId);
        await testCourse.save();

        testTeacher.enrolledCourses.push(courseId);
        await testTeacher.save();

        const res = await request(app)
        .put(`/api/courses/unenrollTeacher/${courseId}/${teacherId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.unenrolledCourse._id).toBe(courseId);
        expect(res.body.unenrolledCourse.enrolledTeachers.includes(teacherId));

        // Validate in DB
        const updatedCourse = await Course.findById(courseId);
        expect(updatedCourse.enrolledTeachers.includes(teacherId)).toBe(false);

        const updatedTeacher = await Teacher.findById(teacherId);
        expect(updatedTeacher.enrolledCourses.includes(courseId)).toBe(false);
    });
});

