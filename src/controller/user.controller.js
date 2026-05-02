import chalk from "chalk";
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, gender } = req.body;

        if (!name || !email || !mobile || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required!"
            })
        }
        const userId = `USER_${mobile}`;

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

        if (result) {
            return res.status(200).json({
                success: true,
                message: "User Created Successfully!",
                result
            })
        }

    } catch (error) {
        console.log(chalk.redBright(error));
        return res.status(400).json({
            success: false,
            message: "Usercreate Api failed"
        })

    }

}
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ isDeleted: false, email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Email is not in database please register"
        })
    }

    // password matched
    const matchedPassword = await bcrypt.compare(password, user.password)
    const token = jwt.sign(
        {
            userId: user.userId,
            email: user.email,
            gender: user.gender
        },
        process.env.secreteKey,
        { "expiresIn": "1d" }
    );

    return res.status(200).json({
        success: true,
        message: "Log in successfully!",
        token
    })

}