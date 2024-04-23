const Ticket=require("../models/Ticket.model.js")
const logger =require("../utilities/logger.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//get me
const getMe= async (req, res) => {
  res.json('Working')
};

//create user
const addTicket = async (req, res) => {
  const { ticketID, fullName, email, feedback, rating } =
    req.body;
  const newTicket = new Ticket({
    ticketID,
    fullName,
    email,
    feedback,
    rating,
  });
  try {
    await newTicket.save();
    res.json("New Ticket added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add ticket" });
  }
};


//get all users
const getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};


//get user by email
const getTicketByEmail = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({email:req.params.email});
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};


//update user by email
const updateTicket = async (req, res) => {
  try {

    const ticket = await Ticket.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true }
   );
   logger.info("Ticket " + req.params.email + " update successful");
    if (!ticket) {
       logger.error("Ticket " + req.params.email + " not found");
        return res.status(404).json({ message: 'Ticket not found' });
   }
   res.status(200).json(ticket);
  } catch (error) {
   res.status(400).json({ message: error.message });
    logger.error("Ticket " + req.params.email + " update unsuccessful");
  }
};

//delete user by email
const deleteTicket = async (req, res) => {
  try {
   const ticket = await Ticket.findOneAndDelete({ email: req.params.email });
   if (!ticket) {
       logger.error("Ticket " + req.params.email + " not found");
       return res.status(404).json({ message: 'Ticket not found' });
   }
   res.status(200).json({ message: 'Ticket deleted' });
    logger.info("Ticket " + req.params.email + " deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.info("Ticket " + req.params.email + " deleted successfully");
  }
};

module.exports = {
  addTicket,
  getAllTicket,
  getTicketByEmail,
  updateTicket,
  deleteTicket,
  // loginUser,
  getMe,
  // searchUser,
  // changePassword,

  
};

