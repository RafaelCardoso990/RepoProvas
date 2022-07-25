import supertest from "supertest"
import { prisma } from "../src/config/db.js"

import app from "../src/index.js"
import { createUser, loginAndReceiveToken } from "./factory/authFactory.js";



const user = { 
    email: "test@email.com",
    password: "123456",
    passwordConfirmation: "123456"
};

const tests = { 
    name: "Prova de Postgres",
    pdfUrl: "https://www.postgresql.org/files/documentation/pdf/15/postgresql-15-A4.pdf",
    categoryId: 2,
    teacherDisciplineId: 1
};

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });

describe("Authentication tests", () =>{
    
    it("Users can register using email and password.", async () =>{        
        const users = await supertest(app).post("/sign-up").send({email: user.email, password: user.password, passwordConfirmation: user.passwordConfirmation})
        expect(users.status).toBe(201)
    })

    it("The password must be confirmed by a second input.",async () => {           
        expect(user.password).toEqual(user.passwordConfirmation)
    })

    it("Users can log in using their registered email and password.",async () => { 
        await createUser()          
        const users = await supertest(app).post("/sign-in").send({email: user.email, password: user.password})
        expect(users.status).toBe(200)
    })

    it("Authentication must be done using JWT tokens.",async () => { 
        const token = await loginAndReceiveToken()          
        expect(token)
    })
    
    
    

})

describe("Create test", ()=>{
    
    it("It must be possible to create new tests in the system/test without token.", async () =>{
        const test = await supertest(app).post("/tests").send({name: tests.name, pdfUrl: tests.pdfUrl, categoryId: tests.categoryId, teacherDisciplineId: tests.teacherDisciplineId})
        expect(test.status).toBe(401)
    }) 

    it("It must be possible to create new tests in the system/test with token.", async () =>{        
        const token = await loginAndReceiveToken()      
        const test = await supertest(app)
            .post('/tests')
            .send({name: tests.name, pdfUrl: tests.pdfUrl, categoryId: tests.categoryId, teacherDisciplineId: tests.teacherDisciplineId})
            .set('Authorization', `Bearer ${token}`);
        expect(test.status).toBe(201);
    })

    it("Evidence has the following information.", async () =>{
        const test = tests              
        expect(test).toEqual(tests);
    })
})

describe("Viewing exams by discipline",  ()=>{
    
    it(`It must be possible to view all tests sent to the system separated by discipline.
    The subjects, in turn, must be separated by period.
    he proofs, in turn, must be separated by types of proof (P1, P2, P3, P2ch, Others).
    The name of the test must be accompanied by the instructor.`, async () =>{
        const token = await loginAndReceiveToken()
        const test = await supertest(app).get("/tests?groupBy=disciplines").set('Authorization', `Bearer ${token}`)
        expect(test.status).toBe(200)
    })

})
describe("View of exams by instructor person",  ()=>{
    
    it(`It must be possible to view all the tests sent to the system separated by instructor person.
        The tests, in turn, must be separated by the type of test (P1, P2, P3, P2ch, Others).
        The name of the test must be accompanied by the discipline.`, async () =>{
        const token = await loginAndReceiveToken()
        const test = await supertest(app).get("/tests?groupBy=teachers").set('Authorization', `Bearer ${token}`)
        expect(test.status).toBe(200)
    })

})
afterAll(async () => {
    await prisma.$disconnect()
});