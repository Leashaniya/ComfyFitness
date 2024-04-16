const express = require("express");
const router = express.Router();


const {
  addFinance,
  getAllFinance,
  updateFinance,
  deleteFinance,
  getFinanceById,
} = require("../controllers/Finance.controller.js");

router.post("/add", addFinance);
router.get("/", getAllFinance);
router.put("/update/:id", updateFinance);
router.delete("/delete/:id", deleteFinance);
router.get("/get/:id", getFinanceById);

module.exports = router;





