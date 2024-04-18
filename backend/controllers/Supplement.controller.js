// User.controller.js
// const Customer = require("../models/Customer.js");
const Supplement=require("../models/Supplement.model.js")

const addSupplement = async (req, res) => {
  const { supplementID, supplementName, price, expiryDate, company, quantity } =
    req.body;
  const newSupplement = new Supplement({
    supplementID,
    // managerType,
    supplementName,
    price,
    expiryDate,
    company,
    quantity,
  });
  try {
    await newSupplement.save();
    res.json("New supplement added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add supplement" });
  }
};

const getAllSupplement = async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.json(supplements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supplements" });
  }
};

const updateSupplement = async (req, res) => {
  const { id } = req.params;
  const { supplementID,  supplementName, price, expiryDate, company, quantity } =
    req.body;
  try {
    await Supplement.findByIdAndUpdate(id, {
        supplementID,
    //   managerType,
    supplementName,
    price,
    expiryDate,
    company,
    quantity,
    });
    res.json({ status: "Supplement updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update supplement" });
  }
};

const deleteSupplement = async (req, res) => {
  const { id } = req.params;
  try {
    await Supplement.findByIdAndDelete(id);
    res.json({ status: "Supplement deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete supplement" });
  }
};

const getSupplementById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplement = await Supplement.findById(id);
    if (!supplement) {
      return res.status(404).json({ error: "Supplement not found" });
    }
    res.json(supplement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supplement" });
  }
};

module.exports = {
  addSupplement,
  getAllSupplement,
  updateSupplement,
  deleteSupplement,
  getSupplementById,
};

