import Joi from "joi";
import { avatarUrlMessages, emailMessages, nameMessages, passwordMessages } from "./response";




  
export const registerValidator = Joi.object({
    name: Joi.string().min(3).max(30).required().messages(nameMessages),
    email: Joi.string().email().required().messages(emailMessages),
    password: Joi.string().min(6).required().messages(passwordMessages),
    avatarUrl: Joi.string().uri().optional().messages(avatarUrlMessages),
  });


  export const loginValidator = Joi.object({
    email: Joi.string().email().required().messages(emailMessages),
    password: Joi.string().min(6).required().messages(passwordMessages),
  })

  