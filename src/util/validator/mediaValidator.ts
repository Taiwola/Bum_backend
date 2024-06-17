import Joi from "joi";
import { mediaContactIdMessage, mediaDescriptionMessage, mediaSubAccoutIdMessage, mediaTitleMessage, mediaUrlMessage } from "./response";


export const createValidator = Joi.object({
    title: Joi.string().min(3).max(30).required().messages(mediaTitleMessage),
    description: Joi.string().min(3).max(100).required().messages(mediaDescriptionMessage),
    url: Joi.string().min(3).max(700).required().messages(mediaUrlMessage),
    contactId: Joi.string().min(3).max(500).optional().messages(mediaContactIdMessage),
    subAccountId: Joi.string().min(3).max(500).required().messages(mediaSubAccoutIdMessage)
})