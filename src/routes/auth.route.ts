import express from "express";

const router = express.Router();

// import controller
import {logUserOut, loginUser, registerUser} from "../controller";


router.post("/register",  registerUser);
router.post("/login", loginUser);
router.post('/logout', logUserOut);


export {router as authRouter}