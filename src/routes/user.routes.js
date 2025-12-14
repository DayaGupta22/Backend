import {Router }from "express";
import { registerUser } from "../controllers/user.controllers.js";


const router = Router();

router.route("/register").post(registerUser)


//router.route("/register").post(loginUser) //. https:localhost:8000/api/v1/users/register


export default router; 