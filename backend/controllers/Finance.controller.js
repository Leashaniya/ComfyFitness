// User.controller.js
// const Customer = require("../models/Customer.js");
const Finance=require("../models/Finance.models.js")

const addFinance = async (req, res) => {
    const { salaryID, firstName, lastName,lastUpdated,salary,frequency } =
      req.body;
    const newFinance= new Finance({
        salaryID,
         firstName, 
         lastName,
         lastUpdated,
         salary,
         frequency
      
    });
    try {
      await newFinance.save();
      res.json("Finance create successful");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add Finance" });
    }
  };


  const getAllFinance = async (req, res) => {
    try {
      const finances = await Finance.find();
      res.json(finances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch finance details" });
    }
  };


  const updateFinance = async (req, res) => {
    const { id } = req.params;
    const {  salaryID, firstName, lastName,lastUpdated,salary,frequency  } =
      req.body;
    try {
      await Finance.findByIdAndUpdate(id, {
        salaryID,
        firstName, 
        lastName,
        lastUpdated,
        salary,
        frequency
       
      });
      res.json({ status: "finance details updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update finance details" });
    }
  };


  const deleteFinance = async (req, res) => {
    const { id } = req.params;
    try {
      await Finance.findByIdAndDelete(id);
      res.json({ status: "finance details deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete finance details" });
    }
  };

  const getFinanceById = async (req, res) => {
    const { id } = req.params;
    try {
      const finance= await Finance.findById(id);
      if (!finance) {
        return res.status(404).json({ error: "finance detail not found" });
      }
      res.json(finance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch finance details" });
    }
  };

  module.exports = {
        addFinance,
    getAllFinance,
    updateFinance,
    deleteFinance,
    getFinanceById,
  };