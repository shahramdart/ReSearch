import { where } from "sequelize";
import TownModel from "../Model/town_model.js";

//? Get all town
export const getTown = async (req, res) => {
  try {
    const town = await TownModel.findAll();
    if (town.length === 0) {
      return res.status(404).json({ msg: "No data found!" });
    }
    res.status(200).json(town);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data", error: error.message });
  }
};

//? Get town by id
export const getTownById = async (req, res) => {
  const { id } = req.params;
  try {
    const town = await TownModel.findOne({
      where: { id },
    });
    if (!town) {
      return res.status(404).json({ msg: `No Town found with this id: ${id}` });
    }
    res.status(200).json(town);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data by id", error: error.message });
  }
};

// ? Add town and showing new town
export const addTown = async (req, res) => {
  if (!town_name || !city_id) {
    return res
      .status(404)
      .json({ msg: `${town_name} & ${city_id} are required!` });
  }
  try {
    const town = await TownModel.create({
      town_name,
      city_id,
      user_id: req.userId,
    });
    res.status(201).json(town);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of adding data", error: error.message });
  }
};

// ? update town
export const updateTown = async (req, res) => {
  const { id } = req.params;
  const { town_name, city_id } = req.body;

  if (!town_name || !city_id) {
    return res
      .status(400)
      .json({ msg: "Both 'town_name' and 'city_id' are required!" });
  }

  try {
    const town = await TownModel.findOne({ where: { id } });

    if (!town) {
      return res.status(404).json({ msg: `No Town found with this ID: ${id}` });
    }

    await TownModel.update({ town_name, city_id }, { where: { id } });

    const updatedTown = await TownModel.findOne({ where: { id } });

    res
      .status(200)
      .json({ msg: "Town updated successfully", data: updatedTown });
  } catch (error) {
    res.status(500).json({ msg: "Error updating town", error: error.message });
  }
};

// ? delete town by id
export const deleteTown = async (req, res) => {
  const { id } = req.params;
  try {
    const town = await TownModel.findOne({ where: { id } });
    if (!town) {
      return res.status(404).json({ msg: `No Town found with this ID: ${id}` });
    }

    await TownModel.destroy({
      where: { id },
    });
    res.status(200).json({ msg: `Town Deleted From This id: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting town", error: error.message });
  }
};
