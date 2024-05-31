import express from "express";

const router = express.Router();

// import controller
import {logUserOut, loginUser, registerUserController, verifyUser} from "../controller";
import { authentication } from "../middleware/authentication";

router.get('/verify', authentication, verifyUser);
router.post("/register",  registerUserController);
router.post("/login", loginUser);
router.post('/logout', logUserOut);


export {router as authRouter}