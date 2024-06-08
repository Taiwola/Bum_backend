import express from "express";
import { authentication } from "../middleware/authentication";
import { create_notification, delete_notification, get_all_notification, get_one_notification, update_notification } from "../controller";


const router = express.Router();

router.get('/', authentication, get_all_notification);
router.get('/:Id', authentication, get_one_notification);
router.post('/', authentication, create_notification);
router.patch('/:Id', authentication, update_notification);
router.delete('/:Id', authentication, delete_notification);


export {router as notificationRouter};