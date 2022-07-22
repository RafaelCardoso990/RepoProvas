import { Router } from "express"
import testsController from "../controllers/testsController.js"
import { validateToken } from "../middlewares/validateToken.js"

const testsRouter = Router()

testsRouter.post("/tests", validateToken,testsController.insertTest)
testsRouter.get("/tests", testsController.getTests)


export default testsRouter