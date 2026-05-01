import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String

    },
    gender: {
        type: String

    },
}, {
    timestamps: true
})

const UserModel = mongoose.Model("User", userSchema);

export default UserModel;