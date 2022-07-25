import { prisma } from "../../src/config/db.js"
import supertest from "supertest"
import bcrypt from "bcrypt"
import app from "../../src/index.js";

const user = {     
  email: "test@email.com",
  password: "123456"
};

export async function createUser () {
  
    const insertedUser = await prisma.users.create({
          data: {              
              email: user.email,
              password: bcrypt.hashSync(user.password, 10)
          }
      });
  
    return insertedUser;
  } 

async function Login() {
    
    const login = {
        email: user.email,
        password: user.password        
    };
    return login
}

export async function loginAndReceiveToken() {    
    await createUser();
    const login = await Login()
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;
    return token;
}