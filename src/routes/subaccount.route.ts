import express from "express";
import { authentication } from "../middleware/authentication";
import { create_subaccount, delete_subaccount, get_all_subaccount, get_one_subaccount, update_subaccount } from "../controller";

const router = express.Router();


router.get("/", authentication, get_all_subaccount);
router.get("/:Id", authentication, get_one_subaccount);
router.post("/", authentication, create_subaccount);
router.patch("/:Id", authentication, update_subaccount);
router.delete("/:Id", authentication, delete_subaccount);



export {router as subAccountRouter}