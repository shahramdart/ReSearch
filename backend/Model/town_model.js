import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import CityModel from "./city_model.js";

const { DataTypes } = Sequelize;

const TownModel = db.define("town", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  town_name: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

TownModel.belongsTo(CityModel, { foreignKey: "city_id" });
CityModel.hasMany(TownModel, { foreignKey: "city_id" });

export default TownModel;
