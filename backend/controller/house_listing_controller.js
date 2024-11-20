import HouseListingModel from "../Model/listing_model.js";
import HousePropertyModel from "../Model/property_model.js";

// ? Get all property
export const getAllListing = async (req, res) => {
  try {
    const listing = await HouseListingModel.findAll();
    if (listing.length === 0) {
      return res.status(404).json({ msg: "No listing Found!" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data!" });
  }
};

// ? get listing by id
export const getListingById = async (req, res) => {
  try {
    const listing = await HouseListingModel.findOne({
      where: { id: req.params.id },
    });
    if (!listing) {
      return res
        .status(404)
        .json({ msg: `No listing found with this id: ${req.params.id}` });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching Data By id!" });
  }
};

//? adding new listing
export const addListing = async (req, res) => {
  const { listing } = req.body;

  const allowedListing = ["Rent", "Sale"];
  if (!listing || !allowedListing.includes(listing)) {
    return res.status(400).json({ msg: "Invalid listing value!" });
  }

  try {
    // Insert the new listing
    const newListing = await HouseListingModel.create({
      listing,
      user_id: req.userId,
    });

    res.status(201).json({
      msg: "House Listing created successfully",
      data: newListing,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error adding new property!", error: error.message });
  }
};

// ? deleting listing by id
export const deletListing = async (req, res) => {
  const { id } = req.params;
  // ? check if the type exists
  const listing = await HouseListingModel.findOne({ where: { id } });
  if (!listing) {
    return res
      .status(404)
      .json({ msg: "No listing Found With This id To Deleting listing!" });
  }

  try {
    // ? deleting type
    await HouseListingModel.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `listing with id ${id} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ msg: "Error in Deleting Type!" });
  }
};
