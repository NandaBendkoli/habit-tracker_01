import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { ConnectToDb } from "./Config/database.js";
dotenv.config();

const Port = process.env.PORT || 4000;

const app = express();

// connection with db
ConnectToDb();

app.listen(Port, () => {
    console.log(chalk.yellowBright(`Server is Running on port ${Port},http://localhost:8000/`));
});