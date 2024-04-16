const express = require("express");
const router = express.Router();


const {
    addTraining,
    getAllTraining,
    updateTraining,
    deleteTraining,
    getTrainingById,
} = require("../controllers/Training.controller.js");

router.post("/add", addTraining);
router.get("/", getAllTraining);
router.put("/update/:id", updateTraining);
router.delete("/delete/:id", deleteTraining);
router.get("/get/:id", getTrainingById);

module.exports = router;