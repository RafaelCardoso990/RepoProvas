import categoriesRepository from "../repositories/categoriesRepository.js"

async function getCategories(){
    const categories = await categoriesRepository.getCategories()    
    return categories
}



export default {
  
    getCategories
}