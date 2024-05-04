const Payment = require("../models/Payment.model");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const addPayment = expressAsyncHandler(async (req, res) => {
  const {
    paymentAmount,
    paymentDate,
    pDescription,
    pAddressl,
    pCountry,
    paymentType,
    userId,
    packageName,
    expirationDate,
  } = req.body;
  console.log("ghellp");
  console.log(req.body);

  //Validation
  if (
    !paymentAmount ||
    !paymentDate ||
    !pDescription ||
    !pAddressl ||
    !pCountry ||
    !paymentType ||
    !userId ||
    !packageName ||
    !expirationDate
  ) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "PAY" + randomNum.toString();
  } while (await Payment.findOne({ id: newId })); // Check if the generated ID already exists
  Id = newId;

  try {
    const newPayment = new Payment({
      paymentAmount,
      paymentDate,
      pDescription,
      pAddressl,
      pCountry,
      paymentType,
      Id,
      userId,
      packageName,
      expirationDate,
    });
    console.log(newPayment);
    await newPayment.save();

    if (newPayment) {
      res.status(201).json({
        id: newPayment.paymentID,
        userId: newPayment.userId,
        packageName: newPayment.packageName,
        expirationDate: newPayment.expirationDate,
        paymentAmount: newPayment.paymentAmount,
        paymentDate: newPayment.paymentDate,
        pDescription: newPayment.pDescription,
        pAddressl: newPayment.pAddressl,
        pCountry: newPayment.pCountry,
        paymentType: newPayment.paymentType,
        token: generateToken(newPayment._id),
        message: "paid successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid payment");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete payment" });
  }
});
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
  const paymentId = req.params.Id; // Assuming the  generated ID is passed as a parameter
  const {
    paymentAmount,
    paymentDate,
    pDescription,
    pAddressl,
    pCountry,
    paymentType,
  } = req.body;

  try {
    // Check if all required fields are present
    if (
      !paymentAmount ||
      !paymentDate ||
      !pDescription ||
      !pAddressl ||
      !pCountry ||
      !paymentType
    ) {
      return res.status(400).json({ error: "Please include all fields" });
    }
    // Find the payment by generated ID
    const payment = await Payment.findOne({ Id: paymentId });

    // Check if payment exists
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }

    // Update payment fields
    if (paymentAmount) payment.paymentAmount = paymentAmount;
    if (paymentDate) payment.paymentDate = paymentDate;
    if (pDescription) payment.pDescription = pDescription;
    if (pAddressl) payment.pAddressl = pAddressl;
    if (pCountry) payment.pCountry = pCountry;
    if (paymentType) payment.paymentType = paymentType;

    // Save updated payment
    await payment.save();

    res.status(200).json({
      id: payment.Id,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      pDescription: payment.pDescription,
      pAddressl: payment.pAddressl,
      pCountry: payment.pCountry,
      paymentType: payment.paymentType,
      message: "payment details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update payment details" });
  }
};

const deletePayment = async (req, res) => {
  const paymentId = req.params.id; // Assuming the generated ID is passed as a parameter

  try {
    // Find the payment by generated ID , then delete
    const deletedPayment = await Payment.findOneAndDelete({ Id: paymentId });

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Payment" });
  }
};

const getPaymentById = async (req, res) => {
  const paymentId = req.params.id; // Assuming the generated ID is passed as a parameter

  try {
    const payment = await Payment.findOne({ Id: paymentId });
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};

const getCurrentPackage = async (req, res) => {
  const userId = req.params.userId; // Extract userId from req.params
  console.log(userId);

  try {
    const payments = await Payment.find({ userId });

    if (!payments.length) {
      // Check if no payments are found
      return res.status(404).json({ error: "No payments found for this user" });
    }

    return res.status(200).json(payments); // Return found payments
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching payments" });
  }
};

module.exports = {
  addPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
  getCurrentPackage,
};
