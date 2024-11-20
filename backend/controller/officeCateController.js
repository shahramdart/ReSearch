import OfficeCategory from "../Model/officeCate_model.js";

//? Get all Office Category
export const getOffice = async (req, res) => {
  try {
    const office = await OfficeCategory.findAll();
    if (office.length === 0)
      return res.status(404).json({ msg: "No Office found" });

    res.status(200).json(office);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};

//? Create a new Office
export const createOffice = async (req, res) => {
  const { office_name, office_address } = req.body;

  if (!office_name || !office_address) {
    return res
      .status(400)
      .json({ msg: `${office_name} And ${office_address} is required!` });
  }

  try {
    const newOfficeCategory = await OfficeCategory.create({
      office_name,
      office_address,
      user_id: req.userId, //? Automatically id aw usera denetawa ka login bwa
    });

    res.status(201).json({
      msg: "Office created successfully",
      data: newOfficeCategory,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error inserting data", error: error.message });
  }
};

//? Update Office by ID
export const updateOffice = async (req, res) => {
  const { id } = req.params;
  const { office_name, office_address } = req.body;

  if (!office_name || !office_address) {
    return res
      .status(400)
      .json({ msg: `${office_name} And ${office_address} is required!` });
  }

  // Check if the office exists
  const getOffice = await OfficeCategory.findOne({ where: { id } });
  if (!getOffice) {
    return res.status(404).json({ msg: "No office found with this ID!" });
  }

  try {
    // Update office
    await OfficeCategory.update({ getOffice }, { where: { id } });

    // Fetch updated office data
    const updatedOfficeCategory = await OfficeCategory.findOne({
      where: { id },
    });

    res.status(200).json({
      msg: "office updated successfully",
      data: updatedOfficeCategory,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating data", error: error.message });
  }
};

//? Delete Office by ID
export const deleteOffice = async (req, res) => {
  const { id } = req.params;

  // Check if the office exists
  const office = await OfficeCategory.findOne({ where: { id } });
  if (!office) {
    return res.status(404).json({ msg: "office not found!" });
  }

  try {
    // Delete the office
    await OfficeCategory.destroy({ where: { id } }); // Corrected this line to use officeModel

    res
      .status(200)
      .json({ msg: `Office with id ${id} was successfully deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting office", error: error.message });
  }
};
