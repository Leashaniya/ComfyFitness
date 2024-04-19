const express = require("express");
const router = express.Router();


const {
  addSubscription,
  getAllSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
} = require("../controllers/Subscription.controller.js");

router.post("/add", addSubscription);
router.get("/", getAllSubscription);
router.put("/update/:id", updateSubscription);
router.delete("/delete/:id", deleteSubscription);
router.get("/get/:id", getSubscriptionById);

module.exports = router;


