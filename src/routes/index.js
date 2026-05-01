import express from "express";
import userRoutes from "../routes/user.route.js"

const routes = express.Router();

routes.use("/user", userRoutes);

export default routes;

