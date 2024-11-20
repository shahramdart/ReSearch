import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import User from "./user_model.js";

const { DataTypes } = Sequelize;

const TypeModel = db.define(
  "type",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    style: {
      type: DataTypes.ENUM("Classic", "Modern"),
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

TypeModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(TypeModel, { foreignKey: "user_id" });

export default TypeModel;
