import HouseModel from "../Model/house_model.js";
import ImagesModel from "../Model/images_model.js";

//? get all house
export const getAllHouse = async (req, res) => {
  try {
    const house = await HouseModel.findAll();
    if (house.length === 0) {
      return res.status(404).json({ msg: "No House found!" });
    }

    const imageOfHouse = await ImagesModel.findAll({
      where: house.id,
    });

    res.status(200).json({ data: house, images: imageOfHouse });
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
    const imageOfHouse = await ImagesModel.findAll({
      where: { house_id: house.id },
    });

    res.status(200).json({ data: house, image: imageOfHouse });
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
    kichen,
    living_room,
    direction,
    floor_number,
    listing_id,
    property_id,
    office_id,
    type_id,
    country_id,
    city_id,
    town_id,
    local_area_id,
  } = req.body;

  // Check required fields (location_id and office_id can be null)
  if (price === undefined || price === null) {
    return res.status(400).json({ msg: "Price is required" });
  } else if (area === undefined || area === null) {
    return res.status(400).json({ msg: "Area is required" });
  } else if (bedroom === undefined || bedroom === null) {
    return res.status(400).json({ msg: "Bedroom is required" });
  } else if (bathroom === undefined || bathroom === null) {
    return res.status(400).json({ msg: "Bathroom is required" });
  } else if (kichen === undefined || kichen === null) {
    return res.status(400).json({ msg: "kichen is required" });
  } else if (living_room === undefined || living_room === null) {
    return res.status(400).json({ msg: "Living room is required" });
  } else if (direction === undefined || direction === null) {
    return res.status(400).json({ msg: "Direction (Arasta) is required" });
  } else if (floor_number === undefined || floor_number === null) {
    return res.status(400).json({ msg: "Floor number (Nhom) is required" });
  } else if (listing_id === undefined || listing_id === null) {
    return res
      .status(400)
      .json({ msg: "Listing type (Rent or Sale) is required" });
  } else if (property_id === undefined || property_id === null) {
    return res.status(400).json({
      msg: "Property type (Apartment, House, Villa, Garden) is required",
    });
  } else if (type_id === undefined || type_id === null) {
    return res
      .status(400)
      .json({ msg: "Type (Classic or Modern) is required" });
  } else if (country_id === undefined || country_id === null) {
    return res.status(400).json({ msg: "Country (Wllat) is required" });
  } else if (city_id === undefined || city_id === null) {
    return res.status(400).json({ msg: "City (Parezga) is required" });
  } else if (town_id === undefined || town_id === null) {
    return res.status(400).json({ msg: "Town (Naw shar) is required" });
  } else if (local_area_id === undefined || local_area_id === null) {
    return res.status(400).json({ msg: "Local Area (Nawy Garak) is required" });
  }

  try {
    // Create house entry
    const house = await HouseModel.create({
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
      office_id: office_id || null,
      type_id,
      country_id,
      city_id,
      town_id,
      local_area_id,
      user_id: req.userId,
    });

    // Handle image uploads (if any)
    if (req.files && req.files.length > 0) {
      console.log(req.files); // Log files to ensure they are uploaded
      const imageRecords = req.files.map((file) => ({
        house_id: house.id,
        image_path: `/uploads/${file.filename}`, // Construct the image path
      }));
      console.log(imageRecords); // Log the image records to check data

      // Insert image paths into the Images table
      await ImagesModel.bulkCreate(imageRecords);
    }

    res.status(201).json({
      msg: "House added successfully",
      data: house,
    });
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
  } = req.body;

  // Check required fields
  if (price === undefined || price === null) {
    return res.status(400).json({ msg: "Price is required" });
  } else if (area === undefined || area === null) {
    return res.status(400).json({ msg: "Area is required" });
  } else if (bedroom === undefined || bedroom === null) {
    return res.status(400).json({ msg: "Bedroom is required" });
  } else if (bathroom === undefined || bathroom === null) {
    return res.status(400).json({ msg: "Bathroom is required" });
  } else if (kichen === undefined || kichen === null) {
    return res.status(400).json({ msg: "kichen is required" });
  } else if (living_room === undefined || living_room === null) {
    return res.status(400).json({ msg: "Living room is required" });
  } else if (direction === undefined || direction === null) {
    return res.status(400).json({ msg: "Direction (Arasta) is required" });
  } else if (floor_number === undefined || floor_number === null) {
    return res.status(400).json({ msg: "Floor number (Nhom) is required" });
  } else if (listing_id === undefined || listing_id === null) {
    return res
      .status(400)
      .json({ msg: "Listing type (Rent or Sale) is required" });
  } else if (property_id === undefined || property_id === null) {
    return res.status(400).json({
      msg: "Property type (Apartment, House, Villa, Garden) is required",
    });
  } else if (type_id === undefined || type_id === null) {
    return res
      .status(400)
      .json({ msg: "Type (Classic or Modern) is required" });
  } else if (country_id === undefined || country_id === null) {
    return res.status(400).json({ msg: "Country (Wllat) is required" });
  } else if (city_id === undefined || city_id === null) {
    return res.status(400).json({ msg: "City (Parezga) is required" });
  } else if (town_id === undefined || town_id === null) {
    return res.status(400).json({ msg: "Town (Naw shar) is required" });
  } else if (local_area_id === undefined || local_area_id === null) {
    return res.status(400).json({ msg: "Local Area (Nawy Garak) is required" });
  }

  try {
    const house = await HouseModel.findOne({ where: { id } });
    if (!house) {
      return res
        .status(404)
        .json({ msg: `No House Found With This id: ${id}` });
    }

    // Update house details
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

    // Handle image updates
    if (req.files && req.files.length > 0) {
      // Delete existing images
      await ImagesModel.destroy({ where: { house_id: id } });

      // Insert new images
      const imageRecords = req.files.map((file) => ({
        house_id: id,
        image_path: `/uploads/${file.filename}`,
      }));
      await ImagesModel.bulkCreate(imageRecords);
    }

    // Fetch updated house with images
    const updatedHouse = await HouseModel.findOne({
      where: { id },
      include: [{ model: ImagesModel, as: "images" }],
    });

    res
      .status(200)
      .json({ msg: "House updated successfully", data: updatedHouse });
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

    await ImagesModel.destroy({
      where: { house_id: id },
    });

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
