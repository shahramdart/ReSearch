import express from "express";
const cityRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getTown,
  getTownById,
  addTown,
  updateTown,
  deleteTown,
} from "../controller/town_controller.js";

cityRouter.get("/town", getTown);
cityRouter.get("/town/:id", getTownById);
cityRouter.post("/town", verifyUser, adminOnly, addTown);
cityRouter.put("/town/:id", verifyUser, adminOnly, updateTown);
cityRouter.delete("/town/:id", verifyUser, adminOnly, deleteTown);

export default cityRouter;
