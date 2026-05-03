import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    habitId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    frequency: {
        type: String,
        enum: ["daily", "weekly"],
        default: "daily",
    },

    logs: [
        {
            date: {
                type: String, // "2026-05-02"
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

const habitModel = mongoose.model("Habit", habitSchema);
export default habitModel;