import HabitModel from "../model/habit.model.js";
import { getNextSequence } from "../utils/index.js";

export const createHabit = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;
        const habitId = await getNextSequence("habit_seq", 100000);

        const habit = await HabitModel.create({ habitId, userId, title, description, logs: [] });

        // if (habit) {
        //     return res.status(200).json({
        //         success: true,
        //         message: "Habit Created Successfully!",
        //     })
        // }
        res.redirect("/habit/dashboard");
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })

    }
}
export const toggleHabit = async (req, res) => {
    try {
        const { id } = req.params;

        // today's date (important format)
        const today = new Date().toISOString().split("T")[0];

        const habit = await HabitModel.findById(id);

        if (!habit) {
            return res.status(404).json({
                success: false,
                message: "Habit not found"
            });
        }

        // find today's log
        const existingLog = habit.logs.find(
            (log) => log.date === today
        );

        if (existingLog) {
            // toggle
            existingLog.completed = !existingLog.completed;
        } else {
            // create new log
            habit.logs.push({
                date: today,
                completed: true
            });
        }

        await habit.save();

        // return res.status(200).json({
        //     success: true,
        //     message: "Habit updated successfully",
        //     data: habit
        // });
        res.redirect("/habit/dashboard");

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const habits = await HabitModel.find({ userId });

        res.render("dashboard", { habits });

    } catch (error) {
        console.log(error);
        res.send("Error loading dashboard");
    }
};

// Delete the habit by id
export const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;

        await HabitModel.findByIdAndDelete(
            id
        );

        res.redirect("/habit/dashboard");
    } catch (error) {
        console.log(error);
        res.send("Error deleting habit");
    }
};
