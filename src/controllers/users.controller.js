const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        users.map(user => {
            user.password = undefined;
        });
        return res.send(users);
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

router.post("/register", async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "user already exists" });
        }
        const user = await User.create(req.body);
        user.password = undefined;

        if (user) {
            return res.send(user);
        } else {
            return res.status(400).send({ error: "registration failed" });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req.body._id});
        if(user){
            return res.send({ status: 'deleted'});
        }else{
            return res.status(400).send({ status: 'not deleted'});
        }
    } catch (error) {
        return res.status(400).send({error: error})
    }
});

module.exports = app => app.use("/users", router);
