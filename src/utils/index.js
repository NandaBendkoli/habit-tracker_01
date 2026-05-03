import counterModel from "../model/counter.model.js";

export async function getNextSequence(sequenceName, startValue = 100000) {

    const updated = await counterModel.findOneAndUpdate(
        { counterId: sequenceName },
        { $inc: { seq: 1 } },
        { new: true }
    ).lean();

    if (!updated) {
        const newCounter = await counterModel({
            counterId: sequenceName,
            seq: startValue,
        }).save();
        return newCounter.seq;
    }

    return updated.seq;
}