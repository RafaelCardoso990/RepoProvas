import { prisma } from "../config/db.js";
import { userTypeData } from "../services/authServices";

async function insertUser(user: userTypeData){
    await prisma.users.create({
        data: user
    })
}

async function checkEmail(user: userTypeData) {
    return await prisma.users.findFirst({
        where:{
            email: user.email
        }
    })

}

export default {
    insertUser,
    checkEmail
}
