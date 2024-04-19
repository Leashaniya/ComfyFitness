// User.controller.js
const User=require("../models/User.model.js")
const logger =require("../utilities/logger.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//get me
const getMe= async (req, res) => {
  res.json('Working')
};

//create user
const addUser = async (req, res) => {
  const { userID, fullName, email, phone, username, password,role } =
    req.body;
  const newUser = new User({
    userID,
    fullName,
    email,
    phone,
    username,
    password,
    role,
  });
  try {
    await newUser.save();
    res.json("New user added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user" });
  }
};


//get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


//get user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({email:req.params.email});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


//update user by email
const updateUser = async (req, res) => {
  try {

    const user = await User.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true }
   );
   logger.info("User " + req.params.email + " update successful");
    if (!user) {
       logger.error("User " + req.params.email + " not found");
        return res.status(404).json({ message: 'User not found' });
   }
   res.status(200).json(user);
  } catch (error) {
   res.status(400).json({ message: error.message });
    logger.error("User " + req.params.email + " update unsuccessful");
  }
};

//delete user by email
const deleteUser = async (req, res) => {
  try {
   const user = await User.findOneAndDelete({ email: req.params.email });
   if (!user) {
       logger.error("User " + req.params.email + " not found");
       return res.status(404).json({ message: 'User not found' });
   }
   res.status(200).json({ message: 'User deleted' });
    logger.info("User " + req.params.email + " deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.info("User " + req.params.email + " deleted successfully");
  }
};

module.exports = {
  addUser,
  getAllUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  // loginUser,
  getMe,
  // searchUser,
  // changePassword,

  
};

