import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import HouseModel from "./house_model.js";

const { DataTypes } = Sequelize;

const ImagesModel = db.define("images", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  image_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  house_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// ? foreignKey with house table
ImagesModel.belongsTo(HouseModel, { foreignKey: "house_id" });
HouseModel.hasMany(ImagesModel, { foreignKey: "house_id" });

export default ImagesModel;
