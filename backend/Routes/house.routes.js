import express from "express";
const houseRoute = express.Router();
import {
  getAllHouse,
  getHousebyId,
  addHouse,
  updateHouse,
  deleteHouse,
} from "../controller/house_controller.js";
import { verifyUser } from "../middleware/auth.js";

houseRoute.get("/house", getAllHouse);
houseRoute.get("/house/:id", getHousebyId);
houseRoute.post("/house", verifyUser, addHouse);
houseRoute.put("/house/:id", verifyUser, updateHouse);
houseRoute.delete("/house/:id", verifyUser, deleteHouse);

export default houseRoute;
