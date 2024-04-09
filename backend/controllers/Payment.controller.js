// User.controller.js
// const Customer = require("../models/Customer.js");
const Payment=require("../models/Payment.model.js")

const addPayment = async (req, res) => {
  const { paymentID, Amount, Status } =
    req.body;
  const newPayment= new Payment({
    paymentID,
    Amount,
    Status,
    
  });
  try {
    await newPayment.save();
    res.json("New Payment added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Payment" });
  }
};

const getAllPayment = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const {  paymentID, Amount, Status } =
    req.body;
  try {
    await Payment.findByIdAndUpdate(id, {
      paymentID,
      Amount,
      Status,
    });
    res.json({ status: "Payment updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Payment" });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await Payment.findByIdAndDelete(id);
    res.json({ status: "Payment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Payment" });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment= await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};

module.exports = {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
};

