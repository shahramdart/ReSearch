import express from "express";
const localAreaRoutes = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllLocalArea,
  getLocalAreaById,
  addLocalArea,
  updateLocalArea,
  deleteLocalArea,
} from "../controller/localArea_controller.js";

localAreaRoutes.get("/local", getAllLocalArea);
localAreaRoutes.get("/local/:id", getLocalAreaById);
localAreaRoutes.post("/local", verifyUser, adminOnly, addLocalArea);
localAreaRoutes.put("/local/:id", verifyUser, adminOnly, updateLocalArea);
localAreaRoutes.delete("/local/:id", verifyUser, adminOnly, deleteLocalArea);

export default localAreaRoutes;
