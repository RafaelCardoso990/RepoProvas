import { Request, Response } from "express"
import testsService from "../services/testsService.js"

async function insertTest(req: Request, res: Response   ) {
    const test = req.body

    await testsService.insertTest(test)

    res.sendStatus(201)
}   

async function getTests(req: Request, res: Response){
    const query = req.query.groupBy
    
    if(query == "disciplines"){
        const disciplines = await testsService.getTestsByDisciplines(query)        
        res.status(200).send({disciplines})
    }

    if(query == "teachers"){
        const teachers = await testsService.getTestsByTeachers(query)
        res.status(200).send({teachers})
    }
}



export default {
    insertTest,
    getTests
}