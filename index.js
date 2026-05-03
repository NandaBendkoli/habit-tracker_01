import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { ConnectToDb } from "./Config/database.js";
import routes from "./src/routes/index.js";
import path from "path";
import ejs from "ejs";
import ejsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";


dotenv.config();

const Port = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve("src", "views")));

app.use(ejsLayouts);
app.set("layout", "layout");
app.use(express.static(path.join(process.cwd(), "src")));

app.get("/", (req, res) => { res.render("home") });
app.get("/signup", (req, res) => res.render("signup"));
app.get("/login", (req, res) => res.render("login"));
// app.get("/dashboard", (req, res) => { res.render("dashboard") });

// json body
app.use(express.json());
// form data
app.use(express.urlencoded({ extended: true }));
// connection with db
ConnectToDb();

//routes
// app.use("/habit-tracker/web/v1", routes);
app.use("/", routes);

app.listen(Port, () => {
    console.log(chalk.yellowBright(`Server is Running on port ${Port},http://localhost:8000/`));
});