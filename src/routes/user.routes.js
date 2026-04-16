import { Router } from "express";
import { registerUser,loginUser ,logoutUser} from "../controllers/user.controllers.js";
import { upload } from '../middlewares/multer.middlewares.js'
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { refreshAccessToken } from "../controllers/user.controllers.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar", 
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        },
    ]),
    registerUser);


router.route("/login").post(loginUser) //. https://localhost:8000/api/v1/users/register
// secured route 

router.route("/logout").post(verifyJwt,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router; 