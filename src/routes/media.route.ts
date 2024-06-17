import express from "express";
import { authentication } from "../middleware/authentication";
import { createMedia, deleteMedia, getAllMedia, getOneMedia, updateMedia } from "../controller";

const router = express.Router();

router.get('/', authentication, getAllMedia);
router.get('/:Id', authentication, getOneMedia);
router.post('/', authentication, createMedia);
router.patch('/:Id', authentication, updateMedia);
router.delete('/:Id', authentication, deleteMedia);



export {router as mediaRouter};