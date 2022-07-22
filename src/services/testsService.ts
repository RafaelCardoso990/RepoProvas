import {Tests} from "@prisma/client"
import testsRepository from "../repositories/testsRepository.js"

export type testsTypeData = Omit<Tests, "id">

async function insertTest(test: testsTypeData){
    await testsRepository.insertTest(test)
}

async function getTestsByDisciplines(query: string){
    const disciplines = await testsRepository.getTestsByDisciplines(query)
    return disciplines
}

async function getTestsByTeachers(query: string){
    const tests = await testsRepository.getTestsByTeachers(query)
    return tests
}



export default {
    insertTest,
    getTestsByDisciplines,
    getTestsByTeachers
}