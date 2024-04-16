// User.controller.js
// const Customer = require("../models/Customer.js");
const User = require("../models/User.model.js")

const addUser = async(req, res) => {
    const { userID, fullName, email, phone, username, password } =
    req.body;
    const newUser = new User({
        userID,
        // managerType,
        fullName,
        email,
        phone,
        username,
        password,
    });
    try {
        await newUser.save();
        res.json("New user added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add user" });
    }
};

const getAllUser = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { userID, fullName, email, phone, username, password } =
    req.body;
    try {
        await User.findByIdAndUpdate(id, {
            userID,
            //   managerType,
            fullName,
            email,
            phone,
            username,
            password,
        });
        res.json({ status: "User updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update user" });
    }
};

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ status: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete user" });
    }
};

const getUserById = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

module.exports = {
    addUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserById,
};