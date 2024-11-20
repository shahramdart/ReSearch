import CountryModel from "../Model/country_model.js";

// ? Get all country
export const getAllCountry = async (req, res) => {
  try {
    const country = await CountryModel.findAll();
    if (country.length === 0) {
      return res.status(404).json({ msg: "No country Found!" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data!" });
  }
};

// ? get Country by id
export const getCountryById = async (req, res) => {
  try {
    const country = await CountryModel.findOne({
      where: { id: req.params.id },
    });
    if (!country) {
      return res
        .status(404)
        .json({ msg: `No country found with this id: ${req.params.id}` });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data By id!" });
  }
};

//? adding new Country
export const addCountry = async (req, res) => {
  const { country } = req.body;
  if (!country) {
    return res.status(400).json({ msg: `${country} is required!` });
  }

  try {
    const newCountry = await CountryModel.create({
      country,
    });

    res
      .status(201)
      .json({ msg: "Type created successfully", data: newCountry });
  } catch (error) {
    res.status(500).json({ msg: "Error adding new type!" });
  }
};

// ? deleting Country by id
export const deletCountry = async (req, res) => {
  const { id } = req.params;
  // ? check if the type exists
  const country = await CountryModel.findOne({ where: { id } });
  if (!country) {
    return res
      .status(404)
      .json({ msg: "No country Found With This id To Deleting country!" });
  }

  try {
    // ? deleting type
    await CountryModel.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `Country with id ${id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error in Deleting Type!" });
  }
};
