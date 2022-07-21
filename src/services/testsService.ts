import {Tests} from "@prisma/client"
import testsRepository from "../repositories/testsRepository.js"

export type testsTypeData = Omit<Tests, "id">

async function insertTest(test: testsTypeData){
    await testsRepository.insertTest(test)
}

export default {
    insertTest
}