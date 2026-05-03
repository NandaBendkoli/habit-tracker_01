import express from "express";
import userRoutes from "../routes/user.route.js"
import habitRoutes from "../routes/habit.route.js"

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/habit", habitRoutes);

export default routes;

