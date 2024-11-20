import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import Users from "./user_model.js";

const { DataTypes } = Sequelize;

const OfficeCategory = db.define(
  "office_category",
  {
    id: {
      type: DataTypes.INTEGER, // Use DataTypes.INTEGER for an integer ID
      primaryKey: true, // Mark as primary key
      autoIncrement: true, // Automatically increment the ID
      allowNull: false,
    },
    office_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    office_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Define associations
OfficeCategory.belongsTo(Users, { foreignKey: "user_id" }); // User belongs to Permission
Users.hasMany(OfficeCategory, { foreignKey: "user_id" }); // Permission can have many Users

export default OfficeCategory;
