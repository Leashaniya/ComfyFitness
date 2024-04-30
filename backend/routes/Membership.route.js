const express = require("express");
const router = express.Router();


const {
  addMembership,
  getAllMembership,
  updateMembership,
  deleteMembership,
  getMembershipById,
} = require("../controllers/Membership.controller");

router.post("/add", addMembership);
router.get("/", getAllMembership);
router.put("/update/:Id", updateMembership);
router.delete("/delete/:id", deleteMembership);
router.get("/get/:id", getMembershipById);

module.exports = router;


