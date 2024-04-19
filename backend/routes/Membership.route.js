const express = require("express");
const router = express.Router();
const protect=require("../middleware/authMiddleware.js");

const {
  addMembership,
  getAllMembership,
  getMembershipByEmail,
  getMembershipById,
  updateMembership,
  deleteMembership,
  // searchMembership,
  // sortMembership,

} = require("../controllers/Membership.controller.js");

router.post("/add", addMembership);
router.get("/", getAllMembership);
router.get("/email/:email",getMembershipByEmail)
router.put("/update/:id", updateMembership);
router.delete("/delete/:id", deleteMembership);
router.get("/id/:id", getMembershipById);
// router.get("/sort/:type",sortMembership);


module.exports = router;