import express from "express";
const houseRoute = express.Router();
import { upload } from "../middleware/upload.js";

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
houseRoute.post("/house", verifyUser, upload.array("images", 5), addHouse); // Corrected here
houseRoute.put(
  "/house/:id",
  verifyUser,
  upload.array("images", 5),
  updateHouse
);
houseRoute.delete("/house/:id", verifyUser, deleteHouse);

export default houseRoute;
