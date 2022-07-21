import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Users } from "@prisma/client"
import authRepositoy from "../repositories/authRepositoy.js"

export type userTypeData = Omit<Users, "id">

async function insertUser(user: userTypeData){
    const encryptedPassword = bcrypt.hashSync(user.password, 10)

    const userData = {
        email: user.email,
        password: encryptedPassword
    }

    const existedEmail = await authRepositoy.checkEmail(userData)

    if(existedEmail) throw { status: 409, message: 'E-mail already registered' }

    await authRepositoy.insertUser(userData)
}

async function logUser(user: userTypeData){
    const usersData = await authRepositoy.checkEmail(user)
   
    if(!usersData) throw { status: 404, message: 'E-mail not found' }

    const decryptedPassowrd = await bcrypt.compare(user.password, usersData.password)   

    if(decryptedPassowrd === false) throw { status: 404, message: 'Wrong password' }

    const token = jwt.sign({ email: usersData.email, id: usersData.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
    return token
}

export default{
    insertUser,
    logUser
}