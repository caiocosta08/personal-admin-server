const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
    
});

TaskSchema.pre('save', (next) => {
    this.updatedAt = Date.now();
    return next();
}); 

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;