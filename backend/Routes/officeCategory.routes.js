import express from "express";
const officeRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getOffice,
  createOffice,
  updateOffice,
  deleteOffice,
} from "../controller/officeCateController.js";

officeRouter.get("/office", verifyUser, adminOnly, getOffice);
officeRouter.post("/office", verifyUser, adminOnly, createOffice);
officeRouter.put("/office/:id", verifyUser, adminOnly, updateOffice);
officeRouter.delete("/office/:id", verifyUser, adminOnly, deleteOffice);

export default officeRouter;
