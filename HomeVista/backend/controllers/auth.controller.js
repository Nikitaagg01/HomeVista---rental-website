import bcrypt from "bcryptjs";
import User from "../model/user_model.js";

// ================= SIGNUP =================
export const signUp = async (req, res) => {
  try {
    console.log("API HIT");

    const { name, email, password } = req.body;

    // ✅ validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ check existing user
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    console.log("User created successfully");

    // ✅ send response (NO TOKEN / COOKIE FOR NOW)
    return res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      message: "Signup error",
    });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // ✅ success
    return res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      message: "Login error",
    });
  }
};


// ================= LOGOUT =================
export const logOut = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout error",
    });
  }
};