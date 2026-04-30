import express from "express";
import dotenv from "dotenv";
import color from "color";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:8000/`)
})

