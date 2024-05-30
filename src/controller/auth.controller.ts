import {create_user, get_one_by_email} from "../service";
import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateJwt } from "../config/token";
import { UserInterface } from "../interfaces/user.interface";

// import validator
import {registerValidator, loginValidator} from "../util/validator/authValidator"


export const registerUser = async (req: Request, res: Response) => {
    const {error, value} = registerValidator.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
    const dataBody: UserInterface = req.body;

    // check if email exist
    const userExist = await get_one_by_email(dataBody.email);

    if (userExist) return res.status(409).json({message: 'This email is already in use'});

    try {
        // hash the password
        const hashPwd = await bcrypt.hash(dataBody.password, 10);

        const dataOption: UserInterface = {
            ...dataBody, password: hashPwd
        }

        const user = await create_user(dataOption);

        return res.status(200).json({message: "User Created"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error"});
    }
}

export const loginUser = async (req:Request, res: Response) => {
    const {error, value} = loginValidator.validate(req.body, {abortEarly: false});
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
    const {email, password} = req.body;

    // check if user exist
    const userExist = await get_one_by_email(email);

    if (!userExist) return res.status(404).json({message: "Invalid credential"});

    // compare passwords
    const pwd = await bcrypt.compare(password, userExist.password);

    if (!pwd) return res.status(400).json({message: "invalid credentials"});

    try {
    const accessToken = await generateJwt(email, userExist.id);
    req.session.user_id = userExist.id;
    req.session.email = email;

    return res.status(200).json({
        message: "you have sucessfully logged in",
        accessToken,
        id: userExist.id
    })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error"});
    }
}

export const logUserOut = async (req:Request, res:Response) => {
    if (req.session) {
        // delete the session object
        req.session.destroy((err)=> {
            if(err){
                console.log('error:'+ err);
                return res.status(400).json('unable to log out');
                }
                else{
                    res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
                    return res.status(200).json({message:'logging you out...'}) ;
                    }
                    });
    } else {
        return res.status(200).json({message:"logging you out...", });
    }
}