import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import Permission from "./permission_model.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER, // Use DataTypes.INTEGER for an integer ID
      primaryKey: true, // Mark as primary key
      autoIncrement: true, // Automatically increment the ID
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [10, 20],
      },
    },
    permission_id: {
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
Users.belongsTo(Permission, { foreignKey: "permission_id" }); // User belongs to Permission
Permission.hasMany(Users, { foreignKey: "permission_id" }); // Permission can have many Users

export default Users;
