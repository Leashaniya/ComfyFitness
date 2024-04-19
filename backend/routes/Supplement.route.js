const express = require("express");
const router = express.Router();


const {
  addSupplement,
  getAllSupplement,
  updateSupplement,
  deleteSupplement,
  getSupplementById,
} = require("../controllers/Supplement.controller.js");

router.post("/add", addSupplement);
router.get("/", getAllSupplement);
router.put("/update/:id", updateSupplement);
router.delete("/delete/:id", deleteSupplement);
router.get("/get/:id", getSupplementById);

module.exports = router;