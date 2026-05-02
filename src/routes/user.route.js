import express from "express";
import { createUser, loginUser } from "../controller/user.controller.js";
import { verifyToken } from "../Middleware/middleware.js";


const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser",loginUser)

export default router;