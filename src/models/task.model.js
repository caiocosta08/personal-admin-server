const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
    },
    description: {
        type: String,
        required: true,
        uppercase: true,
    },
    category: {
        type: String,
        required: true,
        uppercase: true,
    },
    status: {
        type: String,
        default: "Pending",
        uppercase: true,
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