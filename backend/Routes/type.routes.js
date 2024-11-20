import express from "express";
const typeRoute = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllType,
  getById,
  addType,
  deletType,
} from "../controller/type_controller.js";

typeRoute.get("/type", getAllType);
typeRoute.get("/type/:id", getById);
typeRoute.post("/type", verifyUser, adminOnly, addType);
// typeRoute.put("/type/:id", verifyUser, adminOnly, updateType);
typeRoute.delete("/type/:id", verifyUser, adminOnly, deletType);

export default typeRoute;
