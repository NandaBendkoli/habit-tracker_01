import chalk from "chalk";
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getNextSequence } from "../utils/index.js";
export const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, gender } = req.body;

        if (!name || !email || !mobile || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required!"
            })
        }
        const userId = "USER" + await getNextSequence("users_seq", 100000);

        const isFoundEmail = await UserModel.findOne({
            isDeleted: false,
            email
        });
        if (isFoundEmail) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exists!"
            })
        }

        const isFoundMobile = await UserModel.findOne({ isDeleted: false, mobile });
        if (isFoundMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile Already Exists!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const result = {
            userId,
            name,
            email,
            mobile,
            password: hashPassword,
            gender
        }
        // save into databse
        await UserModel.create(result);

        // if (result) {
        //     return res.status(200).json({
        //         success: true,
        //         message: "User Created Successfully!",
        //         result
        //     })
        // }
        return res.redirect("/login");
    } catch (error) {
        console.log(chalk.redBright(error));
        return res.status(400).json({
            success: false,
            message: "Usercreate Api failed"
        })

    }

}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email
    const user = await UserModel.findOne({
      isDeleted: false,
      email
    });

    if (!user) {
      return res.status(400).render("login", {
        error: "❌ Email is not registered. Please signup first.",
        email
      });
    }

    // check password
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).render("login", {
        error: "❌ Invalid password",
        email
      });
    }

    // create token
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email
      },
      process.env.secreteKey,
      { expiresIn: "1d" }
    );

    // set cookie and redirect
    return res
      .cookie("token", token, { httpOnly: true })
      .redirect("/habit/dashboard");

  } catch (error) {
    console.log(error);
    res.render("login", {
      error: "Something went wrong. Try again."
    });
  }
};
export const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.render("profile", { user: null });
        }

        const user = await UserModel.findOne({
            userId: req.user.userId,
            isDeleted: false
        });

        res.render("profile", { user });

    } catch (error) {
        console.log(error);
        res.send("Error loading profile");
    }
};