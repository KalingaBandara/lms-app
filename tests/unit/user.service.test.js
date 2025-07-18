const userService = require("../../src/services/user.service");
const dbHandler = require('../in-memory-db-handler.js');

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


describe("createUser Service",()=>{
    it("should create a new user",async ()=>{
    
    const mockUser = {
        "name":"testUser",
        "email":"testuser@example.com"
    }

    const mockRes = await userService.createUser(mockUser)

    expect(mockRes.name).toBe("testUser");
    expect(mockRes).toHaveProperty("_id");

    })

  describe("fetchUsers Service",()=>{
    it("should fetch all existing users",async ()=>{
    
    const mockUser1 = {
        "name":"testUser1",
        "email":"testuser1@example.com"
    }

    const mockUser2 = {
        "name":"testUser2",
        "email":"testuser2@example.com"
    }

    await userService.createUser(mockUser1);
    await userService.createUser(mockUser2);

    const mockRes= await userService.fetchUsers()

    expect(mockRes.length).toBe(2);
    expect(mockRes[0].name).toBe("testUser1");
    expect(mockRes[0]).toHaveProperty("_id");
    expect(mockRes[1].name).toBe("testUser2");
    expect(mockRes[1]).toHaveProperty("_id");

    })
  });

  describe("fetchUserById Service",()=>{
    it("should fetch existing user by Id",async ()=>{
    
    const mockUserReq = {
        "name":"testUser",
        "email":"testuser@example.com"
    }
    const mockUser = await userService.createUser(mockUserReq);
    const mockUserId = mockUser._id.toString();

    const mockRes= await userService.fetchUserById(mockUserId);

    expect(mockRes.name).toBe("testUser");
    expect(mockRes.email).toBe("testuser@example.com");
    expect(mockRes._id.toString()).toBe(mockUserId);

    });

    it("should handle fetching a user by Id when requested Id is not present",async ()=>{
      
    const randomUserId = require('node:crypto').randomBytes(12).toString('hex');
    await expect(userService.fetchUserById(randomUserId)).rejects.toThrow("User not found");

    });
  })

});
