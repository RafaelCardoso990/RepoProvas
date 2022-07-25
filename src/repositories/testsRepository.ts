import { prisma } from "../config/db.js";
import { testsTypeData } from "../services/testsService.js";

async function insertTest(test: testsTypeData){
    await prisma.tests.create({
        data: test
    })
}

async function getTestsByDisciplines(query: any){
    return await prisma.disciplines.findMany({
        select:{
            term: true,
            id: true,
            name: true,
            TeachersDisciplines:{
                select:{
                    id: true,
                    discipline: true,
                    teacher: true,
                    Tests:{
                        select:{
                            id: true,
                            name: true,
                            pdfUrl: true,
                            category: true
                        }
                    }
                }
            },
        }       
    })    
}

async function getTestsByTeachers(query: any){
    return await prisma.teachers.findMany({
        select:{
            name : true,
            TeachersDisciplines:{
                select:{
                    Tests:{ 
                        select:{ name: true,
                                 pdfUrl: true,
                                category: true,
                        }
                    }
                }
            }
        },

    })    
}

export default {
    insertTest,
    getTestsByDisciplines,
    getTestsByTeachers
}