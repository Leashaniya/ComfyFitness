const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getMe,
  // changePassword,
  // loginUser,
  // searchUser,
} = require("../controllers/User.controller.js");

router.post("/add", addUser);
router.get("/", getAllUser);
router.get("/get/:email", getUserByEmail);
router.patch("/update/:email", updateUser);
router.delete("/delete/:email", deleteUser);
router.get("/auth/me",getMe);
// router.patch("/changepassword/:email",changePassword);
// router.post("/login",loginUser);
// router.get("/search/byemail",searchUser);

module.exports = router;