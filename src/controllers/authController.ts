import {Request, Response} from "express"
import authServices from "../services/authServices.js"

async function insertUser(req: Request, res: Response){
    const user = req.body
    
    await authServices.insertUser(user)

    res.sendStatus(201)
}

export async function logUser(req: Request, res: Response){
    const user = req.body

    const token = await authServices.logUser(user)        

    res.status(200).send(token)
}


export default {
    insertUser,
    logUser
}