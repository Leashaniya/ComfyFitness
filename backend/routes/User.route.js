const express = require("express");
const router = express.Router();


const {
    addUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserById,
} = require("../controllers/User.controller.js");

router.post("/add", addUser);
router.get("/", getAllUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", getUserById);

module.exports = router;