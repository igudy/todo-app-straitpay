import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide name"],
        trim: true,
        maxlength: [1000, "Name can not exceed 1000 characters"]
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
