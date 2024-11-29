import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";

const { DataTypes } = Sequelize;

const LocationModel = db.define(
  "location",
  {
    id: {
      type: DataTypes.INTEGER, // Use DataTypes.INTEGER for an integer ID
      primaryKey: true, // Mark as primary key
      autoIncrement: true, // Automatically increment the ID
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    house_id: {
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

export default LocationModel;
