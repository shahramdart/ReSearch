import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import User from "./user_model.js";

const { DataTypes } = Sequelize;

const CountryModel = db.define(
  "country",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [24],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default CountryModel;
