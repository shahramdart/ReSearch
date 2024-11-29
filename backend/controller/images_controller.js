import Image from "../Model/images_model.js";

// ? Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    if (images.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    res
      .status(200)
      .json({ msg: "Images retrieved successfully", data: images });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};

// ? Get image by id
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findOne({ where: { id: req.params.id } });
    if (!image) {
      return res
        .status(404)
        .json({ msg: `No image found with this id: ${req.params.id}` });
    }
    res.status(200).send(image);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error getting this id", error: error.message });
  }
};

// ? inserting image and showing new image
export const addImages = async (req, res) => {
  //? Validate uploaded files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: "No images uploaded" });
  }

  try {
    //? Create image records from uploaded files
    const imageRecords = req.files.map(({ filename }) => ({
      image_path: `/uploads/${filename}`, // Add `/uploads/` to the path
    }));

    //? Bulk insert image records
    const newImages = await Image.bulkCreate(imageRecords);

    //? Respond with success message and created images
    return res.status(201).json({
      msg: "Images created successfully",
      data: newImages,
    });
  } catch (error) {
    //? Handle any errors during the insertion process
    return res
      .status(500)
      .json({ msg: "Error inserting data", error: error.message });
  }
};

// ? updating image by id

// ? deleting image by id
export const deleteImageById = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findOne({ where: { id } });
  if (!image) {
    return res.status(404).json({ msg: "image not found!" });
  }
  try {
    await Image.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `image with id ${id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting data", error: error.message });
  }
};
