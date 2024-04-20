// // User.controller.js
// const Payment=require("../models/Payment.model.js")

// const addPayment = async (req, res) => {
//   const { paymentID, paymentAmount, paymentDate,pDescription,pAddressl,pCountry } =
//     req.body;
//   const newPayment= new Payment({
//      paymentID,
//      paymentAmount, 
//      paymentDate,
//      pDescription,
//      pAddressl,
//      pCountry
    
//   });
//   try {
//     await newPayment.save();
//     res.json("New Payment added");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to add Payment" });
//   }
// };

// const getAllPayment = async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.json(payments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch payments" });
//   }
// };

// const updatePayment = async (req, res) => {
//   const { id } = req.params;
//   const {  paymentID, paymentAmount, paymentDate,pDescription,pAddressl,pCountry  } =
//     req.body;
//   try {
//     await Payment.findByIdAndUpdate(id, {
//       paymentID,
//       paymentAmount, 
//       paymentDate,
//       pDescription,
//       pAddressl,
//       pCountry
     
//     });
//     res.json({ status: "Payment updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update Payment" });
//   }
// };

// const deletePayment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Payment.findByIdAndDelete(id);
//     res.json({ status: "Payment deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete Payment" });
//   }
// };

// const getPaymentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const payment= await Payment.findById(id);
//     if (!payment) {
//       return res.status(404).json({ error: "payment not found" });
//     }
//     res.json(payment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch payment" });
//   }
// };

// module.exports = {
//   addPayment,
//   getAllPayment,
//   updatePayment,
//   deletePayment,
//   getPaymentById,
// };

// User.controller.js
const Payment=require("../models/Payment.model")
const bcrypt=require('bcrypt');
const expressAsyncHandler=require("express-async-handler");
const jwt=require('jsonwebtoken');
const validator=require("validator");
const JWT_SECRET=process.env.JWT_SECRET;

const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const addPayment = expressAsyncHandler(async(req, res)  => {
  const {paymentAmount, paymentDate,pDescription,pAddressl,pCountry } =req.body;

  //Validation
  if (!paymentAmount|| !paymentDate || !pDescription || !pAddressl || !pCountry) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  let Id;
  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "PAY" + randomNum.toString();
  } while (await Payment.findOne({ id: newId })); // Check if the generated ID already exists
  Id = newId;

try{
  const newPayment= new Payment({
     
     paymentAmount, 
     paymentDate,
     pDescription,
     pAddressl,
     pCountry,
     Id,
  });
  await newPayment.save();

  if (newPayment) {
    res.status(201).json({
      id: newPayment.Id,
      paymentAmount: newPayment.paymentAmount,
      paymentDate: newPayment.paymentDate,
      pDescription: newPayment.pDescription,
      pAddressl: newPayment.pAddressl,
      pCountry: newPayment.pCountry,
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
  const paymentId = req.params.Id; // Assuming the customer's generated ID is passed as a parameter
  const { paymentAmount, paymentDate,pDescription,pAddressl,pCountry } = req.body;

  try {
    // Check if all required fields are present
    if (!paymentAmount || !paymentDate || !pDescription || !pAddressl || !pCountry ) {
      return res.status(400).json({ error: "Please include all fields" });
    }
    // Find the customer by generated ID
    const payment = await Payment.findOne({ Id: paymentId });

    // Check if customer exists
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }

    // Update customer fields
    if (paymentAmount) payment.paymentAmount = paymentAmount;
    if (paymentDate) payment.paymentDate = paymentDate;
    if (pDescription) payment.pDescription = pDescription;
    if (pAddressl) payment.pAddressl = pAddressl;
    if (pCountry) payment.pCountry = pCountry;


    // Save updated customer
    await payment.save();

    res.status(200).json({
      id: payment.Id,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      pDescription: payment.pDescription,
      pAddressl: payment.pAddressl,
      pCountry: payment.pCountry,
      message: "payment details updated successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update payment details" });
}
};


const deletePayment = async (req, res) => {
  const paymentId = req.params.id; // Assuming the user's generated ID is passed as a parameter

  try {
    // Find the user by generated ID and role, then delete
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
  const paymentId = req.params.id; // Assuming the user's generated ID is passed as a parameter

  try {
    const payment = await Payment.findOne({ Id: paymentId })
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }
    res.status(200).json(payment);
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