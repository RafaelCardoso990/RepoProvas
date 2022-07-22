import {prisma} from "../config/db.js"

async function getCategories(){
    return await prisma.categories.findMany({
      
    })    
}

export default {
    getCategories
}