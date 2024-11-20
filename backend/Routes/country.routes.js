import express from "express";
const countryRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllCountry,
  getCountryById,
  addCountry,
  deletCountry,
} from "../controller/country_controller.js";

countryRouter.get("/country", getAllCountry);
countryRouter.get("/country/:id", getCountryById);
countryRouter.post("/country", verifyUser, adminOnly, addCountry);
countryRouter.delete("/country/:id", verifyUser, adminOnly, deletCountry);

export default countryRouter;
