import { Router } from "express"
import categoryController from "../controllers/categoryController.js"

import { validateToken } from "../middlewares/validateToken.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", categoryController.getCategories)

export default categoriesRouter