import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import CountryModel from "./country_model.js";

const { DataTypes } = Sequelize;

const CityModel = db.define("city", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  city_name: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
CityModel.belongsTo(CountryModel, { foreignKey: "country_id" });
CountryModel.hasMany(CityModel, { foreignKey: "country_id" });

export default CityModel;
