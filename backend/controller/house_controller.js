import HouseModel from "../Model/house_model.js";

//? get all house
export const getAllHouse = async (req, res) => {
  try {
    const house = await HouseModel.findAll();
    if (house.length === 0) {
      return res.status(404).json({ msg: "No House found!" });
    }

    res.status(200).json(office);
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

