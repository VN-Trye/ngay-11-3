const express = require("express");
const router = express.Router();
const Role = require("../models/Role");
const User = require("../models/User");


// CREATE ROLE
router.post("/", async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL ROLE
router.get("/", async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
});


// GET ROLE BY ID
router.get("/:id", async (req, res) => {
    const role = await Role.findById(req.params.id);
    res.json(role);
});


// UPDATE ROLE
router.put("/:id", async (req, res) => {
    const role = await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(role);
});


// DELETE ROLE (soft delete)
router.delete("/:id", async (req, res) => {
    const role = await Role.findByIdAndUpdate(
        req.params.id,
        { deleted: true },
        { new: true }
    );

    res.json(role);
});


// GET USERS BY ROLE
router.get("/:id/users", async (req, res) => {

    const users = await User.find({
        role: req.params.id,
        deleted: false
    }).populate("role");

    res.json(users);

});

module.exports = router;