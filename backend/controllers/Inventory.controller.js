// User.controller.js
// const Customer = require("../models/Customer.js");
const Inventory=require("../models/Inventory.model.js")

const addInventory = async (req, res) => {
  const { itemID, itemName, itemType, issueDate } =
    req.body;
  const newInventory = new Inventory({
    itemID,
    // managerType,
    itemName,
    itemType,
    issueDate,
  });
  try {
    await newInventory.save();
    res.json("New Inventory added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Inventory" });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventorys = await Inventory.find();
    res.json(inventorys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch inventorys" });
  }
};

const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { itemID,  itemName, itemType, issueDate } =
    req.body;
  try {
    await Inventory.findByIdAndUpdate(id, {
      itemID,
      itemName,
      itemType,
      issueDate,
    });
    res.json({ status: "Inventory updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Inventory" });
  }
};

const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    await Inventory.findByIdAndDelete(id);
    res.json({ status: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Inventory not found" });
    }
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Inventory" });
  }
};

module.exports = {
  addInventory,
  getAllInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
};

