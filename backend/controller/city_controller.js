import CityModel from "../Model/city_model.js";

// ? Get all city
export const getAllCity = async (req, res) => {
  try {
    const city = await CityModel.findAll();
    if (city.length === 0) {
      return res.status(404).json({ msg: "No data found!" });
    }
    res.status(200).json(city);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data", error: error.message });
  }
};

// ? Get city by id
export const getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await CityModel.findOne({
      where: { id },
    });
    if (!city) {
      return res.status(404).json({ msg: `No city found with this id: ${id}` });
    }
    res.status(200).json(city);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data by id", error: error.message });
  }
};

// ? add city and showing
export const addCity = async (req, res) => {
  const { city_name, country_id } = req.body;
  if (!city_name || !country_id) {
    return res
      .status(404)
      .json({ msg: `${city_name} & ${country_id} are required!` });
  }

  try {
    const city = await CityModel.create({
      city_name,
      country_id,
      user_id: req.userId,
    });
    res.status(201).json(city);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of adding data", error: error.message });
  }
};

// ? update city by id
export const updateCity = async (req, res) => {
  const { id } = req.params;
  const { city_name, country_id } = req.body;

  if (!city_name || !country_id) {
    return res
      .status(400)
      .json({ msg: "Both 'city_name' and 'country_id' are required!" });
  }

  try {
    // ? Find the city by ID
    const city = await CityModel.findOne({ where: { id } });

    // ? Check if the city exists
    if (!city) {
      return res.status(404).json({ msg: `No city found with this ID: ${id}` });
    }

    await CityModel.update({ city_name, country_id }, { where: { id } });

    const updatedCity = await CityModel.findOne({ where: { id } });
    res
      .status(200)
      .json({ msg: "City updated successfully", data: updatedCity });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of updating data", error: error.message });
  }
};

// ? delete city by id
export const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await CityModel.findOne({ where: { id } });
    if (!city) {
      return res.status(404).json({ msg: `No city found with this ID: ${id}` });
    }
    await CityModel.destroy({
      where: { id },
    });
    res.status(200).json({ msg: `city Deleted From This id: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting city", error: error.message });
  }
};
