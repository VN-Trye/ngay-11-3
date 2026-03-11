const express = require("express");
const router = express.Router();
const User = require("../models/User");


// CREATE USER
router.post("/", async (req, res) => {

    try {

        const user = new User(req.body);
        await user.save();

        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }

});


// GET ALL USER
router.get("/", async (req, res) => {

    const users = await User.find({
        deleted: false
    }).populate("role");

    res.json(users);

});


// GET USER BY ID
router.get("/:id", async (req, res) => {

    const user = await User.findById(req.params.id)
    .populate("role");

    res.json(user);

});


// UPDATE USER
router.put("/:id", async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(user);

});


// DELETE USER (SOFT DELETE)
router.delete("/:id", async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { deleted: true },
        { new: true }
    );

    res.json(user);

});


// ENABLE USER
router.post("/enable", async (req, res) => {

    const { email, username } = req.body;

    const user = await User.findOne({
        email,
        username
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.status = true;
    await user.save();

    res.json(user);

});


// DISABLE USER
router.post("/disable", async (req, res) => {

    const { email, username } = req.body;

    const user = await User.findOne({
        email,
        username
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.status = false;
    await user.save();

    res.json(user);

});


module.exports = router;