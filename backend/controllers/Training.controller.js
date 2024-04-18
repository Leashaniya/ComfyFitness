// User.controller.js
// const Customer = require("../models/Customer.js");
const Training = require("../models/Training.model.js")

const addTraining = async(req, res) => {
    const { trainingID, fullName, email, phone, date, time } =
    req.body;
    const newTraining = new Training({
        trainingID,
        fullName,
        email,
        phone,
        date,
        time,
    });
    try {
        await newTraining.save();
        res.json("New Trainingadded");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add Training" });
    }
};

const getAllTraining = async(req, res) => {
    try {
        const training = await Training.find();
        res.json(training);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch training" });
    }
};

const updateTraining = async(req, res) => {
    const { id } = req.params;
    const { trainingID, fullName, email, phone, date, time } =
    req.body;
    try {
        await User.findByIdAndUpdate(id, {
            trainingID,
            fullName,
            email,
            phone,
            date,
            time,

        });
        res.json({ status: "Training updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update training" });
    }
};

const deleteTraining = async(req, res) => {
    const { id } = req.params;
    try {
        await Training.findByIdAndDelete(id);
        res.json({ status: "Training deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete training" });
    }
};

const getTrainingById = async(req, res) => {
    const { id } = req.params;
    try {
        const training = await Training.findById(id);
        if (!training) {
            return res.status(404).json({ error: "Training not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

module.exports = {
    addTraining,
    getAllTraining,
    updateTraining,
    deleteTraining,
    getTrainingById,
};