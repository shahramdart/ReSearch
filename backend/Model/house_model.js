import { Sequelize } from "sequelize";
import db from "../Config/db_connection.js";
import User from "./user_model.js";
import Location from "./location_model.js";
import OfficeCategory from "./officeCate_model.js";
import Type from "./type_model.js";
import CountryModel from "./country_model.js";
import HouseListingModel from "./listing_model.js";
import HousePropertyModel from "./property_model.js";
import CityModel from "./city_model.js";
import LocalAreaModel from "./localArea_model.js";
import TownModel from "./town_model.js";

const { DataTypes } = Sequelize;

const HouseModel = db.define("house", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bedroom: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bathroom: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  kichen: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  living_room: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255], // Corrected length validation
    },
  },
  floor_number: {
    type: DataTypes.INTEGER,
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
  listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  office_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  type_id: {
    type: DataTypes.INTEGER,
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
  city_id: {
    type: DataTypes.INTEGER,
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
  local_area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Foreign key relationships
HouseModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(HouseModel, { foreignKey: "user_id" });

HouseModel.belongsTo(Location, { foreignKey: "location_id" });
Location.hasMany(HouseModel, { foreignKey: "location_id" });

HouseModel.belongsTo(OfficeCategory, { foreignKey: "office_id" });
OfficeCategory.hasMany(HouseModel, { foreignKey: "office_id" });

HouseModel.belongsTo(Type, { foreignKey: "type_id" });
Type.hasMany(HouseModel, { foreignKey: "type_id" });

HouseModel.belongsTo(CountryModel, { foreignKey: "country_id" });
CountryModel.hasMany(HouseModel, { foreignKey: "country_id" });

HouseModel.belongsTo(HouseListingModel, { foreignKey: "listing_id" });
HouseListingModel.hasMany(HouseModel, { foreignKey: "listing_id" });

HouseModel.belongsTo(HousePropertyModel, { foreignKey: "property_id" });
HousePropertyModel.hasMany(HouseModel, { foreignKey: "property_id" });

HouseModel.belongsTo(CityModel, { foreignKey: "city_id" });
CityModel.hasMany(HouseModel, { foreignKey: "city_id" });

HouseModel.belongsTo(LocalAreaModel, { foreignKey: "local_area_id" });
LocalAreaModel.hasMany(HouseModel, { foreignKey: "local_area_id" });

HouseModel.belongsTo(TownModel, { foreignKey: "town_id" });
TownModel.hasMany(HouseModel, { foreignKey: "town_id" });

export default HouseModel;
