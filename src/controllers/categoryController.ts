import { Request, Response } from "express"
import categoriesService from "../services/categoriesService.js"


async function getCategories(req: Request, res: Response   ) {    
    const categories = await categoriesService.getCategories()    
    res.status(200).send({categories})
}   

export default {
    getCategories
}
