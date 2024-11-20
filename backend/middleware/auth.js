import User from "../Model/user_model.js"; // Correct path
import PermissionModel from "../Model/permission_model.js"; // Correct path
export const verifyUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    req.userId = user.id;
    req.permission_id = user.permission_id; // Keep the permission_id from your model

    next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const permissionRecord = await PermissionModel.findOne({
      where: {
        id: req.permission_id,
      },
    });

    if (!permissionRecord || permissionRecord.permissions !== "Admin") {
      // Assuming the permission name is "Admin"
      return res.status(403).json({
        msg: "Access denied: Only admins are authorized to access this resource.",
      });
    }

    next();
  } catch (error) {
    console.error("Error in adminOnly middleware:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
