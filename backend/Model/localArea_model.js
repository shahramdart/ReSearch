import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import TownModel from "./town_model.js";

const { DataTypes } = Sequelize;

const LocalAreaModel = db.define("localAreas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  local_name: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  town_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// ? Relation with town table
LocalAreaModel.belongsTo(TownModel, { foreignKey: "town_id" }),
  TownModel.hasMany(LocalAreaModel, { foreignKey: "town_id" });

export default LocalAreaModel;
