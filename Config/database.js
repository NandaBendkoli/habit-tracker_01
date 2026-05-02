import chalk from "chalk";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const ConnectToDb = async () => {
    try {
        const mongodbUrl = process.env.MONGOURI;
        // console.log(mongodbUrl);
        const connection = mongoose.connect(mongodbUrl);

        if (connection) {
            console.log(chalk.greenBright("Database Connected Successfully!"));
        } else {
            console.log(chalk.redBright("Error in Database Connection!"));

        }
    }
    catch (error) {
        console.log(chalk.redBright("Error occured in ConnectToDb Function!", error));
    }

}