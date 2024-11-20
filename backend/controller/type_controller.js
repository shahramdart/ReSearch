import TypeModel from "../Model/type_model.js";

// ? Get all types
export const getAllType = async (req, res) => {
  try {
    const type = await TypeModel.findAll();
    if (type.length === 0) {
      return res.status(404).json({ msg: "No Type Found!" });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data!" });
  }
};

// ? get type by id
export const getById = async (req, res) => {
  try {
    const type = await TypeModel.findOne({ where: { id: req.params.id } });
    if (!type) {
      return res
        .status(404)
        .json({ msg: `No Type found with this id: ${req.params.id}` });
    }

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data By id!" });
  }
};

//? adding new type
export const addType = async (req, res) => {
  const { style } = req.body;
  if (!style) {
    return res.status(400).json({ msg: `${style} is required!` });
  }

  try {
    const newType = await TypeModel.create({
      style,
      user_id: req.userId,
    });

    res.status(201).json({ msg: "Type created successfully", data: newType });
  } catch (error) {
    res.status(500).json({ msg: "Error adding new type!" });
  }
};

// ? updating new type
export const updateType = async (req, res) => {
  const { id } = req.params;
  const { style, property, listing_type } = req.body;

  if (!style || !property || !listing_type) {
    return res
      .status(400)
      .json({ msg: "style, property, and listing_type are required!" });
  }

  // Check if the type exists
  const getType = await TypeModel.findOne({ where: { id } });
  if (!getType) {
    return res.status(404).json({ msg: "No Type found with this ID!" });
  }

  try {
    // Update the record with the new values
    await TypeModel.update(
      { style, property, listing_type },
      { where: { id } }
    );

    const updatedType = await TypeModel.findOne({ where: { id } });
    res.status(200).json({
      msg: "Type updated successfully",
      data: updatedType,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating type!", error: error.message });
  }
};

// ? deleting type by id
export const deletType = async (req, res) => {
  const { id } = req.params;
  // ? check if the type exists
  const type = await TypeModel.findOne({ where: { id } });
  if (!type) {
    return res
      .status(404)
      .json({ msg: "No Type Found With This id To Deleting Type!" });
  }

  try {
    // ? deleting type
    await TypeModel.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `Type with id ${id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error in Deleting Type!" });
  }
};
