import express from "express";
const houseRoute = express.Router();
import {
  getAllHouse,
  getHousebyId,
  //   createOffice,
  //   updateOffice,
  //   deleteOffice,
} from "../controller/house_controller.js";

houseRoute.get("/house", getAllHouse);
houseRoute.get("/house/:id", getHousebyId);
// houseRoute.post("/office", verifyUser, adminOnly, createOffice);
// houseRoute.put("/office/:id", verifyUser, adminOnly, updateOffice);
// houseRoute.delete("/office/:id", verifyUser, adminOnly, deleteOffice);

export default houseRoute;
