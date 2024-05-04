const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
  userId: {
    type: String,
    default: "",
  },

  packageName: {
    type: String,
  },
  expirationDate: {
    // New field
    type: Date,
    required: [true, "Please add an expiration date"],
  },
  //2
  paymentAmount: {
    type: Number,
    required: [true, "Please add a payment amount"],
    min: [1, "Payment amount cannot be negative"],
  },
  //3
  paymentDate: {
    type: Date,
    required: [true, "Please add a payment date"],
  },
  //4
  pDescription: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  //5
  pAddressl: {
    type: String,
    required: [true, "Please add a payment address"],
  },

  pCountry: {
    type: String,
    required: [true, "Please add a payment country"],
  },
  paymentType: {
    type: String,
    required: [true, "Please add a payment type"],
    enum: ["Online", "Offline"],
    default: "Offline",
  },
  Id: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
