const Subscription = require("../models/Subscription.model");
const bcrypt=require("bcrypt");
const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken")
const validator = require("validator");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;




const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const addSubscription = expressAsyncHandler(async (req, res) => {
  const { packageName,price,duration,description,category,startDate,endDate } = req.body;

  //Validation
  if (!packageName || !price || !duration || !description || !category || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  let Id;
  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "PACK" + randomNum.toString();
  } while (await Subscription.findOne({ id: newId })); // Check if the generated ID already exists
  Id = newId;


  try {
    //Create user
    const newSubscription= new Subscription({
      packageName,
      price,
      duration,
      description,
      category,
      startDate,
      endDate,
      Id,
    });
    await newSubscription.save();

    if (newSubscription) {
      res.status(201).json({
        id: newSubscription.Id,
        packageName: newSubscription.packageName,
        price: newSubscription.price,
        duration: newSubscription.duration,
        description: newSubscription.description,
        category: newSubscription.category,
        startDate: newSubscription.startDate,
        endDate: newSubscription.endDate,
        token: generateToken(newSubscription._id),
        message: "package registered successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register customer" });
  }

});


// Get all subscriptions
const getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

// // Update a subscription by ID
// const updateSubscription = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedSubscription = await Subscription.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedSubscription) {
//       return res.status(404).json({ error: "Subscription not found" });
//     }
//     res.status(200).json(updatedSubscription);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update subscription" });
//   }
// };

//updatecustomer
const updateSubscription = async (req, res) => {
  const subscriptionId = req.params.Id; // Assuming the customer's generated ID is passed as a parameter
  const { packageName,price,duration,description,category,startDate,endDate } = req.body;

  try {
    // Check if all required fields are present
    if (!packageName || !price || !duration || !description || !category || !startDate || !endDate) {
      return res.status(400).json({ error: "Please include all fields" });
    }
    // Find the customer by generated ID
    const subscription = await Subscription.findOne({ Id: subscriptionId });

    // Check if customer exists
    if (!subscription) {
      return res.status(404).json({ error: "subscription not found" });
    }

    // Update customer fields
    if (packageName) subscription.packageName = packageName;
    if (price) subscription.price = price;
    if (duration) subscription.duration = duration;
    if (description) subscription.description = description;
    if (category) subscription.category = category;
    if (startDate) subscription.startDate = startDate;
    if (endDate) subscription.endDate = endDate;

    // Save updated customer
    await subscription.save();

    res.status(200).json({
      id: subscription.Id,
      packageName: subscription.packageName,
      price: subscription.price,
      duration: subscription.duration,
      description: subscription.description,
      category: subscription.category,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      message: "subscription details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update subscription details" });
}
};


// Delete a subscription by ID
// const deleteSubscription = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedSubscription = await Subscription.findByIdAndDelete(id);
//     if (!deletedSubscription) {
//       return res.status(404).json({ error: "Subscription not found" });
//     }
//     res.status(200).json({ message: "Subscription deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete subscription" });
//   }
// };
const deleteSubscription = async (req, res) => {
  const subscriptionId = req.params.id; // Assuming the user's generated ID is passed as a parameter

  try {
    // Find the user by generated ID and role, then delete
    const deletedSubscription = await Subscription.findOneAndDelete({ Id: subscriptionId });

    if (!deletedSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Subscription" });
  }
};

// Get a subscription by ID
// const getSubscriptionById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const subscription = await Subscription.findById(id);
//     if (!subscription) {
//       return res.status(404).json({ error: "Subscription not found" });
//     }
//     res.status(200).json(subscription);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch subscription" });
//   }
// };

const getSubscriptionById = async (req, res) => {
  const subscriptionId = req.params.id; // Assuming the user's generated ID is passed as a parameter

  try {
    const subscription = await Subscription.findOne({ Id: subscriptionId })
    if (!subscription) {
      return res.status(404).json({ error: "subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

module.exports = {
  addSubscription,
  getAllSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
};