import { where } from "sequelize";
import HouseModel from "../Model/house_model.js";

//? get all house
export const getAllHouse = async (req, res) => {
  try {
    const house = await HouseModel.findAll();
    if (house.length === 0) {
      return res.status(404).json({ msg: "No House found!" });
    }

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data!", error: error.message });
  }
};

// ? get house by id
export const getHousebyId = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await HouseModel.findOne({
      where: { id },
    });
    if (!house) {
      return res
        .status(404)
        .json({ msg: `No house found with this id: ${id}` });
    }

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data!", error: error.message });
  }
};

// ? add house and show new house
export const addHouse = async (req, res) => {
  const {
    price,
    area,
    bedroom,
    bathroom,
    kichen, // Corrected typo from 'kichen' to 'kichen'
    living_room,
    direction,
    floor_number,
    listing_id,
    property_id,
    location_id,
    office_id,
    type_id,
    country_id,
    city_id,
    town_id,
    local_area_id,
  } = req.body;

  // Check required fields (location_id and office_id can be null)
  if (
    !price ||
    !area ||
    !bedroom ||
    !bathroom ||
    !kichen ||
    !living_room ||
    !direction ||
    !floor_number ||
    !listing_id ||
    !property_id ||
    !location_id ||
    !office_id ||
    !type_id ||
    !country_id ||
    !city_id ||
    !town_id ||
    !local_area_id
  ) {
    return res.status(400).json({ msg: "All required fields must be filled." });
  }

  try {
    const house = await HouseModel.create({
      price,
      area,
      bedroom,
      bathroom,
      kichen, // Corrected typo
      living_room,
      direction,
      floor_number,
      listing_id,
      property_id,
      location_id: location_id || null, // Can be null if optional
      office_id: office_id || null, // Can be null if optional
      type_id,
      country_id,
      city_id,
      town_id,
      local_area_id,
      user_id: req.userId,
    });
    res.status(201).json({ msg: "House added successfully", data: house });
  } catch (error) {
    res.status(500).json({ msg: "Error adding house!", error: error.message });
  }
};

// ? update house by id
export const updateHouse = async (req, res) => {
  const { id } = req.params;
  const {
    price,
    area,
    bedroom,
    bathroom,
    kichen, // Corrected typo from 'kichen' to 'kichen'
    living_room,
    direction,
    floor_number,
    listing_id,
    property_id,
    location_id,
    office_id,
    type_id,
    country_id,
    city_id,
    town_id,
    local_area_id,
  } = req.body;

  // Check required fields (location_id and office_id can be null)
  if (
    !price ||
    !area ||
    !bedroom ||
    !bathroom ||
    !kichen ||
    !living_room ||
    !direction ||
    !floor_number ||
    !listing_id ||
    !property_id ||
    !location_id ||
    !office_id ||
    !type_id ||
    !country_id ||
    !city_id ||
    !town_id ||
    !local_area_id
  ) {
    return res.status(400).json({ msg: "All required fields must be filled." });
  }

  try {
    const house = await HouseModel.findOne({
      where: { id },
    });

    if (!house) {
      return res
        .status(404)
        .json({ msg: `No House Found With This id: ${id}` });
    }

    // Update house using only provided fields
    await HouseModel.update(
      {
        price,
        area,
        bedroom,
        bathroom,
        kichen,
        living_room,
        direction,
        floor_number,
        listing_id,
        property_id,
        location_id,
        office_id,
        type_id,
        country_id,
        city_id,
        town_id,
        local_area_id,
      },
      { where: { id } }
    );

    // Fetch updated house from database
    const houseAfterUpdate = await HouseModel.findOne({
      where: { id },
    });

    res
      .status(200)
      .json({ msg: "House updated successfully", data: houseAfterUpdate });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating House!", error: error.message });
  }
};
// ? Delete house by id
export const deleteHouse = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await HouseModel.findOne({ where: { id } });
    if (!house) {
      return res
        .status(404)
        .json({ msg: `No House found with this ID: ${id}` });
    }
    await HouseModel.destroy({
      where: { id },
    });
    res.status(200).json({ msg: `House Deleted From This id: ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting  House", error: error.message });
  }
};
