import PermissionModel from "../Model/permission_model.js"; // Correct import for default export

//? Get all permissions
export const getPermission = async (req, res) => {
  try {
    const permissions = await PermissionModel.findAll(); // Retrieve all permissions
    if (permissions.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }
    res.status(200).json(permissions);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};

//? Insert a new permission
export const createPermission = async (req, res) => {
  const { permissions } = req.body;

  // Check if permissions is provided
  if (!permissions) {
    return res.status(400).json({ msg: "Permission permissions is required" });
  }

  try {
    // Create new permission
    const newPermission = await PermissionModel.create({ permissions });

    res.status(201).json({
      msg: "Permission inserted successfully",
      data: newPermission, // Return the new permission object
    });
  } catch (error) {
    res.status(500).json({ msg: "Error inserting data", error: error.message });
  }
};

//? Update permission by ID
export const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  // Check if permissions is provided
  if (!permissions) {
    return res.status(400).json({ msg: "Permission permissions is required" });
  }

  // Check if the permission exists
  const permission = await PermissionModel.findOne({ where: { id } });
  if (!permission) {
    return res.status(404).json({ msg: "No permission found with this ID!" });
  }

  try {
    // Update permission
    await PermissionModel.update({ permissions }, { where: { id } });

    // Fetch updated permission data
    const updatedPermission = await PermissionModel.findOne({ where: { id } });

    res.status(200).json({
      msg: "Permission updated successfully",
      data: updatedPermission,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating data", error: error.message });
  }
};

//? Delete permission by ID
export const deletePermission = async (req, res) => {
  const { id } = req.params;

  // Check if the permission exists
  const permission = await PermissionModel.findOne({ where: { id } });
  if (!permission) {
    return res.status(404).json({ msg: "Permission not found!" });
  }

  try {
    // Delete the permission
    await PermissionModel.destroy({ where: { id } }); // Corrected this line to use PermissionModel

    res
      .status(200)
      .json({ msg: `Permission with id ${id} was successfully deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting permission", error: error.message });
  }
};
