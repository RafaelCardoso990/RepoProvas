import { prisma } from "../config/db.js";
import { testsTypeData } from "../services/testsService.js";

async function insertTest(test: testsTypeData){
    await prisma.tests.create({
        data: test
    })
}

export default {
    insertTest
}