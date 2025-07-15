const mongoose = require("mongoose");
const request = require("supertest");
const dbHandler = require('./db-handler.js');
const app = require("../src/app.js");

// const courseService = require('../src/services/course.service');
const User = require('../src/models/user.model.js');
const Teacher = require('../src/models/teacher.model.js');
const Course = require('../src/models/course.model.js');


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

describe("POST /api/teachers", () => {
    it("should create a new teacher", async () => {
        const res = await request(app)
        .post("/api/teachers")
        .send({ name: "Test Teacher", email: "test@gmail.com" });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
    });

    it("should handle empty teacher name", async () => {
        const res = await request(app)
        .post("/api/teachers")
        .send({ name: "", email: "test@gmail.com" });
        
        expect(res.statusCode).toBe(400);
    });

    it("should handle empty teacher email", async () => {
        const res = await request(app)
        .post("/api/teachers")
        .send({ name: "testTeacher", email: "" });
        
        expect(res.statusCode).toBe(400);
    });

     it("should handle duplicate teacher name", async () => {
        await request(app)
        .post("/api/teachers")
        .send({ name: "testTeacher", email: "test@gmail.com" });

        const res2 = await request(app)
        .post("/api/teachers")
        .send({ name: "testTeacher", email: "test2@gmail.com" });
        
        expect(res2.statusCode).toBe(400);
    });

    it("should handle duplicate teacher email", async () => {
        await request(app)
        .post("/api/users")
        .send({ name: "testTeacher", email: "test@gmail.com" });

        const res2 = await request(app)
        .post("/api/users")
        .send({ name: "testTeacher2", email: "test@gmail.com" });
        
        expect(res2.statusCode).toBe(400);
    });

    
});

describe("GET /api/teachers", () => {
    it("should fetch list of teachers", async () => {
        // await request(app)
        // .post("/api/teachers")
        // .send({ name: "testTeacher", email: "test@gmail.com" });

        const res = await request(app)
        .get("/api/teachers")
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body).toBeInstanceOf(Array);


    });
});

describe("GET /api/teachers/:id", () => {
    it("should fetch the teacher correspoding to given ID", async () => {
        // const res1 = await request(app)
        // .post("/api/teachers")
        // .send({ name: "testTeacher", email: "test@gmail.com" });
        // expect(res1.statusCode).toBe(201);

        // const teacherId = res1._body._id;
        // console.log(teacherId);
      
        const testTeacher = await Teacher.create({ name: "testTeacher", email: "test@gmail.com" });
        const teacherId = testTeacher._id.toString();

        const res = await request(app)
        .get(`/api/teachers/${teacherId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body._id).toBe(teacherId);

    });

    it("should handle fetching when requested teacher ID is not avaiable", async () => {
        const teacherId = require('node:crypto').randomBytes(12).toString('hex');

        const res = await request(app)
        .get(`/api/teachers/${teacherId}`)
        expect(res.statusCode).toBe(404);
        expect(res.body).toBeEmpty;

    });
});

describe("GET /api/teachers/:id", () => {
    it("should fetch the teacher correspoding to given ID", async () => {
        
        const testTeacher = await Teacher.create({ name: "testTecaher", email: "test@gmail.com" });
        const teacherId = testTeacher._id.toString();

        const res = await request(app)
        .get(`/api/teachers/${teacherId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body._id).toBe(teacherId);

    });
});

