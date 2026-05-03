// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
// export const verifyToken = async (req, res, next) => {
//     try {

//         const authHeader = req.header("Authorization");
//         if (!authHeader) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide the token!"
//             })
//         }

//         // extraxt the token from bearer example "Bearer dfghj3456789 gdhe345678ghjdf32564.eg67233ye2378.e7328et6"

//         // const token = authHeader.split(" ")[1];
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Token format!"
//             })
//         }

//         const decoded = jwt.verify(token, process.env.secreteKey);
//         req.user = decoded;
//         next();

//     }
//     catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid or expired Token"
//         })

//     }


// }


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.redirect("/login"); 
    }

    const decoded = jwt.verify(token, process.env.secreteKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/login");
  }
};