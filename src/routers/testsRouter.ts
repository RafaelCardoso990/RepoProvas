import { Router } from "express"
import testsController from "../controllers/testsController.js"

const testsRouter = Router()

testsRouter.post("/tests", testsController.insertTest)


export default testsRouter