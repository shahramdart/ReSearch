import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import Users from "./user_model.js";

const { DataTypes } = Sequelize;

const HouseListingModel = db.define(
  "listing",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    listing: {
      type: DataTypes.ENUM("Rent", "Sale"),
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

HouseListingModel.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(HouseListingModel, { foreignKey: "user_id" });

export default HouseListingModel;
