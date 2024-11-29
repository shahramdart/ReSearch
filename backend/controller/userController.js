import argon2 from "argon2";
import User from "../Model/user_model.js";
import PermissionModel from "../Model/permission_model.js";

//? Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // This will retrieve all columns without renaming
    if (users.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};

//? Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id }, // Assumes "id" is the column name as in Knex
    });

    if (!user) {
      return res.status(404).json({ msg: "No user registered with this id" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};

//? Insert a new user
export const createUser = async (req, res) => {
  const { name, email, password, user_phone, permission } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !user_phone || !permission) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already in use" });
  }

  // Lookup permission (assuming you have a Permission model)
  const permissionRecord = await PermissionModel.findOne({
    where: { permissions: permission }, // Corrected from `permission` to `permissions`
  });
  if (!permissionRecord) {
    return res.status(400).json({ msg: "Invalid permission value!" });
  }

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await argon2.hash(password); // Ensure hashing is done in a try-catch for error handling
  } catch (hashError) {
    return res
      .status(500)
      .json({ msg: "Error hashing password", error: hashError.message });
  }

  try {
    // Insert the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,

      user_phone,
      permission_id: permissionRecord.id, // Assuming your User model has this foreign key
    });

    res.status(201).json({
      msg: "User inserted successfully",
      data: newUser, // Directly returning the new user object
    });
  } catch (error) {
    res.status(500).json({ msg: "Error inserting data", error: error.message });
  }
};

//? Update user by ID
export const updateUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    certificate,
    user_phone,
    permission,
  } = req.body;

  // ? Calling the user by ID
  const user = await User.findOne({
    where: {
      user_Id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User not Found!" });

  // Prepare update data
  const updateData = {};

  // If a new name is provided
  if (name) updateData.name = name;

  // If a new email is provided
  if (email) updateData.email = email;

  // If password is provided, ensure it matches confirmation and hash it
  if (password) {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password doesn't match Confirm Password" });
    }
    updateData.password = await argon2.hash(password);
  }

  // If certificate is provided
  if (certificate) updateData.certificate = certificate;

  // If user_phone is provided
  if (user_phone) updateData.user_phone = user_phone;

  // If permission is provided, check its validity
  if (permission) {
    const permissionRecord = await PermissionModel.findOne({
      where: { permission },
    });
    if (!permissionRecord) {
      return res.status(400).json({ msg: "Invalid permission value!" });
    }
    updateData.permission_id = permissionRecord.id; // Assuming the user model has this foreign key
  }

  // Check if there is anything to update
  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ msg: "At least one field is required to update!" });
  }

  try {
    // Update user
    await User.update(updateData, {
      where: {
        user_Id: req.params.id,
      },
    });

    // Fetch updated user data
    const updatedUser = await User.findOne({
      where: {
        user_Id: req.params.id,
      },
      attributes: ["user_Id", "name", "email", "role"], // Specify fields to return
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//? Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({
      where: {
        user_Id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not Found!" });
    }

    // Delete the user
    await User.destroy({
      where: {
        user_Id: req.params.id,
      },
    });

    res
      .status(200)
      .json({ msg: `User with id ${req.params.id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error: error.message });
  }
};
