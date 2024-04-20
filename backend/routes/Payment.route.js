const express = require("express");
const router = express.Router();


const {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
} = require("../controllers/Payment.controller.js");
const { protect } = require("../middleware/authMiddleware.js");
const { paymentAuthentication } = require("../middleware/authentication.js");

router.post("/add", addPayment);
router.get("/", getAllPayment);
router.put("/update/:Id", updatePayment);
router.delete("/delete/:id", deletePayment);
router.get("/get/:id", getPaymentById);

module.exports = router;


