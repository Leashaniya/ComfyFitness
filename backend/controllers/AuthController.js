import User from "../models/User.model";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
    const { userID, fullName, email, phone, username, password,role } = req.body;
  
    try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ userID,fullName, email, password: hashedPassword, phone, username,role });
  
      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const validUser = await User.findOne({ email: email });
  
      if (!validUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!validUser.password) {
        return res.status(401).json({ error: "Password not set for this user" });
      }
  
      const validPassword = await bcrypt.compare(password, validUser.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: "Password wrong" });
      }
  
      // Exclude the password from the response
      const { password: _, ...rest } = validUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  