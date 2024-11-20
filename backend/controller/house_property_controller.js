import HousePropertyModel from "../Model/property_model.js";

// ? Get all property
export const getAllProperty = async (req, res) => {
  try {
    const proeprty = await HousePropertyModel.findAll();
    if (proeprty.length === 0) {
      return res.status(404).json({ msg: "No Proeprty Found!" });
    }
    res.status(200).json(proeprty);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data!" });
  }
};

// ? get property by id
export const getPropertyById = async (req, res) => {
  try {
    const proeprty = await HousePropertyModel.findOne({
      where: { id: req.params.id },
    });
    if (!proeprty) {
      return res
        .status(404)
        .json({ msg: `No Proeprty found with this id: ${req.params.id}` });
    }

    res.status(200).json(proeprty);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data By id!" });
  }
};

//? adding new property
export const addProperty = async (req, res) => {
  const { property } = req.body;

  const allowedProperties = ["Apartment", "House", "Villa", "Garden"];
  if (!property || !allowedProperties.includes(property)) {
    return res.status(400).json({ msg: "Invalid property value!" });
  }

  try {
    // Insert the new property
    const newProperty = await HousePropertyModel.create({
      property,
      user_id: req.userId,
    });

    res.status(201).json({
      msg: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error adding new property!", error: error.message });
  }
};

// ? deleting type by id
export const deletProperty = async (req, res) => {
  const { id } = req.params;
  // ? check if the type exists
  const property = await HousePropertyModel.findOne({ where: { id } });
  if (!property) {
    return res
      .status(404)
      .json({ msg: "No Type Found With This id To Deleting Type!" });
  }

  try {
    // ? deleting type
    await HousePropertyModel.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `Type with id ${id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error in Deleting Type!" });
  }
};
