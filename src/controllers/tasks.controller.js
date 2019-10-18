const express = require('express');
const Task = require('../models/task.model');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort('-updatedAt');
        if(tasks.length > 0){
            return res.send(tasks);
        }else{
            return res.status(400).send({error: 'no tasks found'});
        }
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

router.post("/register", async (req, res) => {
    try {

        const task = await req.body;
        task.title = task.title.toUpperCase();
        task.description = task.description.toUpperCase();
        task.category = task.category.toUpperCase();
        task.status = task.status.toUpperCase();
        task = await Task.create(task);
        if(task){
            return res.send(task);
        }else{
            return res.status(400).send({error: 'tasks register failed'});
        }
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

router.post("/update", async (req, res) => {
    try {
        const task = await req.body;
        task = await Task.findOneAndUpdate({_id: task._id}, {
            title: task.title.toUpperCase(),
            description: task.description.toUpperCase(),
            category: task.category.toUpperCase(),
            status: task.status.toUpperCase(),
        });
        if(task){
            return res.send(task);
        }else{
            return res.status(400).send({error: 'tasks register failed'});
        }
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

router.post("/delete", async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.body._id});
        if(task){
            return res.send({ status: 'deleted'});
        }else{
            return res.status(400).send({ status: 'not deleted'});
        }
    } catch (error) {
        return res.status(400).send({error: error})
    }
});

module.exports = app => app.use("/tasks", router);