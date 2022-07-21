import { Router } from "express"
import authController from "../controllers/authController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemas.js"
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js"

const authRouter = Router()

authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema), authController.insertUser)
authRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), authController.logUser)

export default authRouter