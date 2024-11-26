import LocalAreaModel from "../Model/localArea_model.js";

// ? Get all local area
export const getAllLocalArea = async (req, res) => {
  try {
    const localArea = await LocalAreaModel.findAll();
    if (localArea.length === 0) {
      return res.status(404).json({ msg: "No data found!" });
    }
    res.status(200).json(localArea);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data", error: error.message });
  }
};

// ? Get by Id
export const getLocalAreaById = async (req, res) => {
  const { id } = req.params;

  try {
    const local = await LocalAreaModel.findOne({ where: { id } });
    if (!local) {
      return res
        .status(404)
        .json({ msg: `No Local Area Found with this id: ${id}` });
    }
    res.status(200).json(local);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of getting data by id", error: error.message });
  }
};

// ? add local area and showin this local area
export const addLocalArea = async (req, res) => {
  const { local_name, town_id } = req.body;
  if (!local_name || !town_id) {
    return res
      .status(404)
      .json({ msg: `${local_name} & ${town_id} are required!` });
  }

  try {
    const local = await LocalAreaModel.create({
      local_name,
      town_id,
      user_id: req.userId,
    });
    res.status(201).json(local);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of adding data", error: error.message });
  }
};

// ? update Local area by id
export const updateLocalArea = async (req, res) => {
  const { id } = req.params;
  const { local_name, town_id } = req.body;

  if (!local_name || !town_id) {
    return res
      .status(400)
      .json({ msg: "Both 'local_name' and 'town_id' are required!" });
  }

  try {
    // ? Find the localArea by ID
    const localArea = await LocalAreaModel.findOne({ where: { id } });

    // ? Check if the localArea exists
    if (!localArea) {
      return res
        .status(404)
        .json({ msg: `No localArea found with this ID: ${id}` });
    }

    await LocalAreaModel.update({ local_name, town_id }, { where: { id } });

    const updatedLocalArea = await LocalAreaModel.findOne({ where: { id } });
    res
      .status(200)
      .json({ msg: "Local Area updated successfully", data: updatedLocalArea });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error of updating data", error: error.message });
  }
};

// ? delete Local Area by id
export const deleteLocalArea = async (req, res) => {
  const { id } = req.params;
  try {
    const loal = await LocalAreaModel.findOne({ where: { id } });
    if (!loal) {
      return res
        .status(404)
        .json({ msg: `No Local Area found with this ID: ${id}` });
    }
    await LocalAreaModel.destroy({
      where: { id },
    });
    res.status(200).json({ msg: `Local Area Deleted From This id: ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting  Local Area", error: error.message });
  }
};
