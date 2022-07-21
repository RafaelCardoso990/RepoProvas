import { Request, Response } from "express"
import testsService from "../services/testsService.js"

async function insertTest(req: Request, res: Response   ) {
    const test = req.body

    await testsService.insertTest(test)

    res.sendStatus(201)
}   

export default {
    insertTest
}