const express = require("express");
const router = express.Router();


const {
  addSubscription,
  getAllSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
  getSubscriptionByPrice,
} = require("../controllers/Subscription.controller.js");

router.post("/add", addSubscription);
router.get("/", getAllSubscription);
router.put("/update/:Id", updateSubscription);
router.delete("/delete/:id", deleteSubscription);
router.get("/get/:id", getSubscriptionById);
router.get("/get/:price", getSubscriptionByPrice);

module.exports = router;


