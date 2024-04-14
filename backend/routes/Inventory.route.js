const express = require("express");
const router = express.Router();


const {
  addInventory,
  getAllInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
} = require("../controllers/Inventory.controller.js");

router.post("/add", addInventory);
router.get("/", getAllInventory);
router.put("/update/:id", updateInventory);
router.delete("/delete/:id", deleteInventory);
router.get("/get/:id", getInventoryById);

module.exports = router;