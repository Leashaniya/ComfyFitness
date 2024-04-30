const Membership = require("../models/Membership.model");
const bcrypt=require("bcrypt");
const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken")
const validator = require("validator");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;


const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const addMembership = expressAsyncHandler(async (req, res) => {
  const { email, membershipType,expirationDate } = req.body;

  //Validation
  if (!email || !membershipType || !expirationDate) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  let Id;
  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "MEM" + randomNum.toString();
  } while (await Membership.findOne({ id: newId })); // Check if the generated ID already exists
  Id = newId;


  try {
    const newMembership= new Membership({
        email,
        membershipType,
        expirationDate,
      Id,
    });
    await newMembership.save();

    if (newMembership) {
      res.status(201).json({
        id: newMembership.Id,
        email: newMembership.email,
        membershipType: newMembership.membershipType,
        expirationDate: newMembership.expirationDate,
        token: generateToken(newMembership._id),
        message: "membership registered successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid membership data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create membership" });
  }

});


// Get all subscriptions
const getAllMembership = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
};


//updatesubscription
const updateMembership = async (req, res) => {
  const membershipId = req.params.Id; 
  const { email, membershipType,expirationDate } = req.body;

  try {
    // Check if all required fields are present
    if (!email || !membershipType || !expirationDate ) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    const membership = await Membership.findOne({ Id: membershipId });

    // Check if subscription exists
    if (!membership) {
      return res.status(404).json({ error: "membership not found" });
    }

    // Update subscription fields
    if (email) membership.email = email;
    if (membershipType) membership.membershipType = membershipType;
    if (expirationDate) membership.expirationDate = expirationDate;

    // Save updated subscription
    await membership.save();

    res.status(200).json({
      id: membership.Id,
      email: membership.email,
      membershipType: membership.membershipType,
      expirationDate: membership.expirationDate,
      message: "membership details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update membership details" });
}
};


const deleteMembership= async (req, res) => {
  const membershipId = req.params.id; // Assuming the generated ID is passed as a parameter

  try {
  
    const deleteMembership = await Membership.findOneAndDelete({ Id: membershipId });

    if (!deleteMembership) {
      return res.status(404).json({ error: "membership not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "membership deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete membership" });
  }
};


const getMembershipById = async (req, res) => {
  const membershipId = req.params.id; 

  try {
    const membership = await Membership.findOne({ Id: membershipId })
    if (!membership) {
      return res.status(404).json({ error: "membership not found" });
    }
    res.status(200).json(membership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch membership" });
  }
};

module.exports = {
  addMembership,
  getAllMembership,
  updateMembership,
  deleteMembership,
  getMembershipById,
};
