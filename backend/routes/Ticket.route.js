const express = require("express");
const router = express.Router();

const {
  addTicket,
  getAllTicket,
  getTicketByEmail,
  updateTicket,
  deleteTicket,
  getMe,
  // changePassword,
  // loginUser,
  // searchUser,
} = require("../controllers/Ticket.controller.js");

router.post("/add", addTicket);
router.get("/", getAllTicket);
router.get("/get/:email", getTicketByEmail);
router.patch("/update/:email", updateTicket);
router.delete("/delete/:email", deleteTicket);
router.get("/auth/me",getMe);
// router.patch("/changepassword/:email",changePassword);
// router.post("/login",loginUser);
// router.get("/search/byemail",searchUser);

module.exports = router;