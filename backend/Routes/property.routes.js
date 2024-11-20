import express from "express";
const propertyRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllProperty,
  getPropertyById,
  addProperty,
  deletProperty,
} from "../controller/house_property_controller.js";

propertyRouter.get("/property", getAllProperty);
propertyRouter.get("/property/:id", getPropertyById);
propertyRouter.post("/property", verifyUser, adminOnly, addProperty);
propertyRouter.delete("/property/:id", verifyUser, adminOnly, deletProperty);

export default propertyRouter;
