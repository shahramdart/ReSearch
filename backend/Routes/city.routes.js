import express from "express";
const cityRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllCity,
  addCity,
  updateCity,
  getCityById,
  deleteCity,
} from "../controller/city_controller.js";

cityRouter.get("/city", getAllCity);
cityRouter.get("/city/:id", getCityById);
cityRouter.post("/city", verifyUser, adminOnly, addCity);
cityRouter.put("/city/:id", verifyUser, adminOnly, updateCity);
cityRouter.delete("/city/:id", verifyUser, adminOnly, deleteCity);

export default cityRouter;
