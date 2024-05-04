const express = require("express");
const router = express.Router();

const {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
  getCurrentPackage,
} = require("../controllers/Payment.controller.js");

router.post("/add", addPayment);
router.get("/", getAllPayment);
router.put("/update/:Id", updatePayment);
router.delete("/delete/:id", deletePayment);
router.get("/getCurrentPackage/:userId", getCurrentPackage);
router.get("/get/:id", getPaymentById);

module.exports = router;
