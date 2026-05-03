import express from "express";
import { createHabit, deleteHabit, getDashboard, toggleHabit } from "../controller/habit.controller.js";
import { verifyToken } from "../Middleware/middleware.js";
const router = express.Router();

router.post("/createHabit", verifyToken, createHabit);
router.get("/dashboard", verifyToken, getDashboard);
router.post("/toggle/:id", verifyToken, toggleHabit);
router.post("/delete/:id", verifyToken, deleteHabit);

export default router;
