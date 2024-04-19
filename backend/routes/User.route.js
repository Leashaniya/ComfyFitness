const express = require("express");
const router = express.Router();
const {
  customerLogin,
  logoutUser,
  updateCustomer,
  updateAdmin,
  updateManager,
  deleteUser,
  getAllUsers,
  getAllCustomers,
  getAllManagers,
  getAllAdmins,
  getUserById,
  customerRegister,
  adminRegister,
  managerRegister,
  adminManagerLogin,
} = require("../controllers/User.controller");
const { protect } = require("../middleware/authMiddleware");
const { customerAuthentication } = require("../middleware/authentication");



// Register a new admin
router.post("/register-admin", adminRegister);
// Get all admins
router.get("/allAdmins", getAllAdmins);
// Update admin
router.put("/update-admin/:Id", updateAdmin);


// Register a new customer
router.post("/register-customer", customerRegister);
// Login a user
router.post("/login-customer", customerLogin);
// Logout a user
router.post("/logout", logoutUser);
// Get all users
router.get("/", getAllUsers);
// Update user
router.put("/update-customer/:Id", updateCustomer);
// Delete user
router.delete("/delete/:id", deleteUser);
// Get user by ID
router.get("/get/:id", getUserById);
// Get all custoemrs
router.get("/allcustomers", getAllCustomers);



// Get all managers
router.get("/allmanagers", getAllManagers);
// Register a new manager
router.post("/register-manager", managerRegister);
// Update manager
router.put("/update-manager/:Id", updateManager);


// Login a admin or manager
router.post("/login-adminAndManger", adminManagerLogin);



module.exports = router;
