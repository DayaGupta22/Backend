import { Router } from "express";
const commentrouter = Router();
import {getComment} from '../controllers/comment.controller.js'

commentrouter.route("/getcomment").get(getComment);
export default commentrouter;