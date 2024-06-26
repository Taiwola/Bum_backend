import express from "express";
import { authentication } from "../middleware/authentication";
import { createTag, getAllTag, getOneTag, getTagsWhereSubAcct, updateTag } from "../controller";
import { delete_tag } from "../service";


const router = express.Router();

router.get('/', authentication, getAllTag);
router.get('/:Id', authentication, getOneTag);
router.get("/subaccount/:Id", authentication, getTagsWhereSubAcct);

router.post('/', authentication, createTag);

router.patch("/:Id", authentication, updateTag);

router.delete("/:Id", authentication, delete_tag);



export {router as tagRouter};