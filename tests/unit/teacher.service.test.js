const teacherService = require("../../src/services/teacher.service.js");
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


describe("createTeacher Service",()=>{
    it("should create a new teacher",async ()=>{
    
    const mockTeacher = {
        "name":"testTeacher",
        "email":"testteacher@example.com"
    }

    const mockRes = await teacherService.createTeacher(mockTeacher)

    expect(mockRes.name).toBe("testTeacher");
    expect(mockRes).toHaveProperty("_id");
    })

  describe("fetchTeachers Service",()=>{
    it("should fetch all existing teachers",async ()=>{
    
    const mockTeacher1 = {
        "name":"testTeacher1",
        "email":"testteacher1@example.com"
    }

    const mockTeacher2 = {
        "name":"testTeacher2",
        "email":"testteacher2@example.com"
    }

    await teacherService.createTeacher(mockTeacher1);
    await teacherService.createTeacher(mockTeacher2);

    const mockRes= await teacherService.fetchTeachers()

    expect(mockRes.length).toBe(2);
    expect(mockRes[0].name).toBe("testTeacher1");
    expect(mockRes[0]).toHaveProperty("_id");
    expect(mockRes[1].name).toBe("testTeacher2");
    expect(mockRes[1]).toHaveProperty("_id");

    })
  });

  describe("fetchTeacherById Service",()=>{
    it("should fetch existing teacher by Id",async ()=>{
    
    const mockTeacherReq = {
        "name":"testTeacher",
        "email":"testteacher@example.com"
    }
    const mockTeacher = await teacherService.createTeacher(mockTeacherReq);
    const mockTeacherId = mockTeacher._id.toString();

    const mockRes= await teacherService.fetchTeacherById(mockTeacherId);

    expect(mockRes.name).toBe("testTeacher");
    expect(mockRes.email).toBe("testteacher@example.com");
    expect(mockRes._id.toString()).toBe(mockTeacherId);

    });

    it("should handle fetching a teacher by Id when requested Id is not present",async ()=>{
      
    const randomTeacherId = require('node:crypto').randomBytes(12).toString('hex');
    await expect(teacherService.fetchTeacherById(randomTeacherId)).rejects.toThrow("Teacher not found");

    });
  })

});
