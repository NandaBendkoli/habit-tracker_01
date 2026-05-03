import express from "express";
import { createUser, getProfile, loginUser } from "../controller/user.controller.js";
import { verifyToken } from "../Middleware/middleware.js";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser)
router.get("/profile", verifyToken, getProfile);

export default router;