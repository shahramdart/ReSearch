import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";

const { DataTypes } = Sequelize;

const PermissionModel = db.define(
  "permission",
  {
    id: {
      type: DataTypes.INTEGER, // Use DataTypes.INTEGER for an integer ID
      primaryKey: true, // Mark as primary key
      autoIncrement: true, // Automatically increment the ID
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ENUM("Admin", "User", "Moderator", "Guest"), // Allowed permission types
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["Admin", "User", "Moderator", "Guest"]],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default PermissionModel;
