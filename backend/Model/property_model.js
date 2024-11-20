import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import TypeModel from "./type_model.js";
import Users from "./user_model.js";

const { DataTypes } = Sequelize;

const HousePropertyModel = db.define(
  "property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    property: {
      type: DataTypes.ENUM("Apartment", "House", "Villa", "Garden"),
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

HousePropertyModel.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(HousePropertyModel, { foreignKey: "user_id" });

export default HousePropertyModel;
