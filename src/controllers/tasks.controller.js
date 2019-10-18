const express = require('express');
const Task = require('../models/task.model');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length > 0) {
            return res.send(tasks);
        } else {
            return res.status(400).send({ error: 'no tasks found' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});
router.post("/delete", async (req, res) => {
    try {
        const task = req.body;
        const tasks = await Task.deleteOne({ userID: task.userID });
        if (tasks.n == 1) {
            return res.send({ message: 'task deleted' });
        } else {
            return res.status(400).send({ error: 'no tasks deleted' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

router.post("/register", async (req, res) => {
    try {
        const task = await req.body;
        task = await Task.create(task);
        if (task) {
            return res.send(task);
        } else {
            return res.status(400).send({ error: 'tasks register failed' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});
router.post("/update", async (req, res) => {
    try {
        let task = await req.body;
        const conditions = {_id: task._id};
        
        task = await Task.findOneAndUpdate(conditions,
            {
                title: task.title,
                description: task.description,
                category: task.category,
                status: task.status,
            }
            );
        return res.send(operation);

    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

module.exports = app => app.use("/tasks", router);