const Membership=require("../models/Membership.model.js")
const logger=require("../utilities/logger.js");

//create a membership
const addMembership= async (req, res) => {
  try {
   const membership = new Membership(req.body);
   await membership.save();
    res.status(201).json(membership);
   logger.info("Membership create successful");
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Membership create failed");
  }
};

//get all membership
const getAllMembership = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
};


//Get membership by email
const getMembershipByEmail= async (req, res) => {
    try {
        const membership = await Membership.findOne({ email: req.params.email });
        if (!membership) {
            logger.error("Membership " + req.params.email + " not found");
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.status(200).json(membership);
    } catch (error) {
         res.status(500).json({ message: error.message });
        logger.error("Error getting membership " + req.params.email);
    }
};


//get membership by id
const getMembershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ error: "Membership not found" });
    }
    res.json(membership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch membership" });
  }
};



//update membership by id
const updateMembership = async (req, res) => {
try {
  const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
  );
  logger.info("Membership " + req.params.id + " update successful");
  if (!membership) {
      logger.error("Membership " + req.params.id + " not found");
      return res.status(404).json({ message: 'Membership not found' });
  }
  res.status(200).json(membership);
} catch (error) {
  res.status(400).json({ message: error.message });
  logger.error("Membership " + req.params.id + " update unsuccessful");
}
};


//delete membership by id
const deleteMembership = async (req, res) => {
    try {
      const membership = await Membership.findByIdAndDelete(req.params.id);
      if (!membership) {
          logger.error("Membership " + req.params.id + " not found");
          return res.status(404).json({ message: 'Membership not found' });
      }
      res.status(200).json({ message: 'Membership deleted' });
      logger.info("Membership " + req.params.id + " deleted successfully");
  } catch (error) {
      res.status(400).json({ message: error.message });
      logger.info("Membership " + req.params.id + " deleted successfully");
  }
};

// //sort membership
// const sortMembership=async(req,res)=>{
//   try {
//     const membership = await Membership.find({ membershipType: req.params.type });
//     if (!membership) {
//         logger.error("Membership " + req.params.type + " not found");
//         return res.status(404).json({ message: 'Membership not found' });
//     }
//     res.status(200).json(membership);
// } catch (error) {
//     res.status(500).json({ message: error.message });
//     logger.error("Error getting membership " + req.params.type);
// }
// };



module.exports = {
addMembership,
getAllMembership,
getMembershipByEmail,
updateMembership,
deleteMembership,
getMembershipById,
// sortMembership,
};




























//     //search
//     searchMembership: async (req, res) => {

//         const { term } = req.query;
//         const regex = new RegExp(term, 'i');
//         const users = await Membership.find({
//             email: regex
//         });

//         res.json(users);
//     },

//     //sort membership
//     sortMembership: async (req, res) => {
//         try {
//             const membership = await Membership.find({ membershipType: req.params.type });
//             if (!membership) {
//                 logger.error("Membership " + req.params.type + " not found");
//                 return res.status(404).json({ message: 'Membership not found' });
//             }
//             res.status(200).json(membership);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//             logger.error("Error getting membership " + req.params.type);
//         }
//     }
// };
