import express from "express";
import { authentication } from "../middleware/authentication";
import { createInvitationController, getInvitationsByAgencyController, getOneInvitationController, updateInvitationController, verifyUserInvitationController } from "../controller";

const router = express.Router();

router.get('/verify', authentication, verifyUserInvitationController);
router.get('/agency', authentication, getInvitationsByAgencyController);
router.get("/:Id", authentication, getOneInvitationController);
router.post('/', authentication, createInvitationController);
router.patch('/:Id', authentication, updateInvitationController);




export {router as invitationRoute}