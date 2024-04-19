const Subscription = require("../models/Subscription.model");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");

// Add package
const addSubscription= expressAsyncHandler(async (req, res) => {
  const { packageName, price, duration, description, category, startDate, endDate } = req.body;

  try {
    // Validation
    if (!packageName || !price || !duration || !description || !category || !startDate || !endDate) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Check if price is a positive number
    if (price <= 0 || !validator.isNumeric(price.toString())) {
      res.status(400);
      throw new Error("Price must be a positive number");
    }

    // Check if duration is a positive integer
    if (duration <= 0 || !Number.isInteger(duration)) {
      res.status(400);
      throw new Error("Duration must be a positive integer");
    }

    // Create package
    const newSubscription = new Subscription({
      packageName,
      price,
      duration,
      description,
      category,
      startDate,
      endDate
    });

    // Save new package
    await newSubscription.save();

    res.status(201).json({
      id: newSubscription._id,
      packageName: newSubscription.packageName,
      price: newSubscription.price,
      duration: newSubscription.duration,
      description: newSubscription.description,
      category: newSubscription.category,
      startDate: newSubscription.startDate,
      endDate: newSubscription.endDate,
      message: "Package added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add package" });
  }
});

// Update package
const updateSubscription = expressAsyncHandler(async (req, res) => {
  const subscriptionId = req.params.id; // Assuming the package's generated ID is passed as a parameter
  const { packageName, price, duration, description, category, startDate, endDate } = req.body;

  try {
    // Check if all required fields are present
    if (!packageName || !price || !duration || !description || !category || !startDate || !endDate) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Check if price is a positive number
    if (price <= 0 || !validator.isNumeric(price.toString())) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    // Check if duration is a positive integer
    if (duration <= 0 || !Number.isInteger(duration)) {
      return res.status(400).json({ error: "Duration must be a positive integer" });
    }

    // Find the package by generated ID
    const subscriptionToUpdate = await Subscription.findById(subscriptionId);

    // Check if package exists
    if (!subscriptionToUpdate) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Update package fields
    subscriptionToUpdate.packageName = packageName;
    subscriptionToUpdate.price = price;
    subscriptionToUpdate.duration = duration;
    subscriptionToUpdate.description = description;
    subscriptionToUpdate.category = category;
    subscriptionToUpdate.startDate = startDate;
    subscriptionToUpdate.endDate = endDate;

    // Save updated package
    await subscriptionToUpdate.save();

    res.status(200).json({
      id: subscriptionToUpdate._id,
      packageName: subscriptionToUpdate.packageName,
      price: subscriptionToUpdate.price,
      duration: subscriptionToUpdate.duration,
      description: subscriptionToUpdate.description,
      category: subscriptionToUpdate.category,
      startDate: subscriptionToUpdate.startDate,
      endDate: subscriptionToUpdate.endDate,
      message: "Package updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update package" });
  }
});

// Delete package
const deleteSubscription = expressAsyncHandler(async (req, res) => {
  const subscriptionId = req.params.id; // Assuming the package's generated ID is passed as a parameter

  try {
    // Find the package by generated ID and delete
    const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);

    if (!deletedSubscription) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete package" });
  }
});

// Get all packages
const getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

// Get package by ID
const getSubscriptionById = async (req, res) => {
  const subscriptionId = req.params.id; // Assuming the package's generated ID is passed as a parameter

  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch package" });
  }
};

module.exports = {
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getAllSubscription,
  getSubscriptionById,
};
