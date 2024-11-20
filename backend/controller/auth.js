import User from "../Model/user_model.js"; // Ensure the path is correct
import argon2 from "argon2";

// ? login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // Verify the password using argon2
    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password!" });
    }

    // Store userId in session
    req.session.userId = user.id; // Use `id` instead of `user_Id`

    // Send back user details (excluding password)
    const { id: userId, name, email: userEmail, permission_id } = user; // Added permission_id if needed
    res.status(200).json({
      msg: "User logged in successfully",
      userId,
      name,
      email: userEmail,
      permission_id, // Include permission_id if necessary
    });
  } catch (error) {
    res.status(500).json({ msg: "Error during login", error: error.message });
  }
};

// ? get authenticated user
export const getUser = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ msg: "User not logged in" });
    }

    // Find the user by session userId
    const user = await User.findOne({
      attributes: ["id", "name", "email", "user_phone", "permission_id"], // Adjusted field names as needed
      where: { id: req.session.userId },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // Send back user details
    res.status(200).json({
      msg: "Authenticated user data loaded successfully",
      ...user.dataValues, // Spread operator to return user details
    });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching user", error: error.message });
  }
};

// ? logout function
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Logout failed, please try again." });
    }
    res.status(200).json({ msg: "Logout successful." });
  });
};
