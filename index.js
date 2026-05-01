import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { ConnectToDb } from "./Config/database.js";
import routes from "./src/routes/index.js";
dotenv.config();

const Port = process.env.PORT || 4000;

const app = express();

// connection with db
ConnectToDb();

//routes
app.use("/habit-tracker/web/v1",routes);

app.listen(Port, () => {
    console.log(chalk.yellowBright(`Server is Running on port ${Port},http://localhost:8000/`));
});