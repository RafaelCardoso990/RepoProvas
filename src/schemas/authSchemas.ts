import joi from "joi";
import { userTypeData } from "../services/authServices.js";

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirmation: joi.string().required()
  
});

export const signInSchema = joi.object<userTypeData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});