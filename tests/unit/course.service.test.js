const courseService = require("../../src/services/course.service");
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


describe("createCourse Service",()=>{
    it("should create a new course",async ()=>{
    
    const mockCourse = {
        "title":"testCourse",
        "description":"This is a test course"
    }

    const mockRes = await courseService.createCourse(mockCourse)

    expect(mockRes.title).toBe("testCourse");
    expect(mockRes).toHaveProperty("_id");

    })

  describe("fetchCourses Service",()=>{
    it("should fetch all existing courses",async ()=>{
    
    const mockCourse1 = {
        "title":"testCourse1",
        "description":"This is a test course"
    }

    const mockCourse2 = {
        "title":"testCourse2",
        "description":"This is a test course"
    }

    await courseService.createCourse(mockCourse1);
    await courseService.createCourse(mockCourse2);

    const mockRes= await courseService.fetchCourses()

    expect(mockRes.length).toBe(2);
    expect(mockRes[0].title).toBe("testCourse1");
    expect(mockRes[0]).toHaveProperty("_id");
    expect(mockRes[1].title).toBe("testCourse2");
    expect(mockRes[1]).toHaveProperty("_id");

    })
  });

  describe("fetchCourseById Service",()=>{
    it("should fetch existing course with its profile by Id",async ()=>{
    
    const mockCourseReq = {
        "title":"testCourse",
        "description":"This is a test course"
    }
    const mockCourse = await courseService.createCourse(mockCourseReq);
    const mockCourseId = mockCourse._id.toString();

    const mockRes= await courseService.fetchCourseById(mockCourseId);

    expect(mockRes.title).toBe("testCourse");
    expect(mockRes._id.toString()).toBe(mockCourseId);
    expect(mockRes).toHaveProperty("enrolledTeachers");
    expect(mockRes).toHaveProperty("enrolledUsers");

    });

    it("should handle fetching a course by Id when requested Id is not present",async ()=>{
      
    const randomCourseId = require('node:crypto').randomBytes(12).toString('hex');
    await expect(courseService.fetchCourseById(randomCourseId)).rejects.toThrow("Course not found");

    });
  })

});
