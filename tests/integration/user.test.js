const mongoose = require("mongoose");
const request = require("supertest");
const dbHandler = require('../in-memory-db-handler.js');
const app = require("../../src/app.js");

// const courseService = require('../src/services/course.service');
const User = require('../../src/models/user.model.js');

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

describe("POST /api/users", () => {
    it("should create a new user", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "Test User", email: "test@gmail.com" });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe("Test User");
        expect(res.body.email).toBe("test@gmail.com");
    });

    it("should handle empty user name", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "", email: "test@gmail.com" });
        
        expect(res.statusCode).toBe(422);
    });

    it("should handle empty user email", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "" });
        
        expect(res.statusCode).toBe(422);
    });

    it("should handle duplicate user name", async () => {
        await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "test@gmail.com" });

        const res2 = await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "test2@gmail.com" });
        
        expect(res2.statusCode).toBe(400);
    });

    it("should handle duplicate user email", async () => {
        await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "test@gmail.com" });

        const res2 = await request(app)
        .post("/api/users")
        .send({ name: "testUser2", email: "test@gmail.com" });
        
        expect(res2.statusCode).toBe(400);
    });

    it("should validate request body to have name and email only", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "test@gmail.com", age:15 });
        
        expect(res.statusCode).toBe(422);
    });

    it("should validate name to have at least 3 characters", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "ab", email: "test@gmail.com" });
        
        expect(res.statusCode).toBe(422);
    });

    it("should validate email", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({ name: "testUser", email: "test.com" });
        
        expect(res.statusCode).toBe(422);
    });
    
});

describe("GET /api/users", () => {
    it("should fetch empty list of users when no user is added", async () => {
        // await request(app)
        // .post("/api/users")
        // .send({ name: "testUser", email: "test@gmail.com" });

        const res = await request(app)
        .get("/api/users")
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body).toEqual([]);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("should fetch list of users when users present", async () => {
        
        await User.create({ name: "testUser", email: "test@gmail.com" });

        const res = await request(app)
        .get("/api/users")
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
            name: "testUser",
            email: "test@gmail.com"
            })
        ])
);

    });
});

describe("GET /api/users/:id", () => {
    it("should fetch the user correspoding to given ID", async () => {
        // const res1 = await request(app)
        // .post("/api/users")
        // .send({ name: "testUser", email: "test@gmail.com" });
        // expect(res1.statusCode).toBe(201);

        // const userId = res1._body._id;
        // console.log(userId);
      
        const testUser = await User.create({ name: "testUser", email: "test@gmail.com" });
        const userId = testUser._id.toString();

        const res = await request(app)
        .get(`/api/users/${userId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body._id).toBe(userId);

    });

    it("should handle fetching when requested user id is not avaiable in database collection", async () => {
        const userId = require('node:crypto').randomBytes(12).toString('hex');

        const res = await request(app)
        .get(`/api/users/${userId}`)
        expect(res.statusCode).toBe(404);
        expect(res.body).toBeEmpty;

    });
});

describe("PUT /api/users/:id", () => {
    it("should update the name of user", async () => {
        
        const testUser = await User.create({ name: "testUser", email: "test@gmail.com" });
        const userId = testUser._id.toString();

        const res = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: "testUser2", email: "test@gmail.com" });

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body.updatedUser._id).toBe(userId);

        const updated = await User.findById(userId);
        expect(updated.name).toBe("testUser2");

    });
});

describe("DELETE /api/users/:id", () => {
    it("should delete the user", async () => {
        
        const testUser = await User.create({ name: "testUser", email: "test@gmail.com" });
        const userId = testUser._id.toString();

        const res = await request(app)
        .delete(`/api/users/${userId}`);

        expect(res.statusCode).toBe(204);
        expect(res.body).not.toBeEmpty;
        expect(res.body.deletedUser._id).toBe(userId);
        expect(res.body.deletedUser.name).toBe("testUser");
        expect(res.body.deletedUser.email).toBe("test@gmail.com");

        const deleted = await User.findById(userId);
        expect(deleted).toBeNull();
    });
});

describe("GET /api/users/profile/:id", () => {
    it("should fetch the user profile correspoding to given ID", async () => {
      
        const testUser = await User.create({ name: "testUser", email: "test@gmail.com" });
        const userId = testUser._id.toString();

        const res = await request(app)
        .get(`/api/users/profile/${userId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeEmpty;
        expect(res.body._id).toBe(userId);

    });
});
