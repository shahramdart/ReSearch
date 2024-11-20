import express from "express";
const permissionRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "../controller/permissionController.js";

permissionRouter.get("/permission", verifyUser, adminOnly, getPermission);
permissionRouter.post("/permission", verifyUser, adminOnly, createPermission);
permissionRouter.put(
  "/permission/:id",
  verifyUser,
  adminOnly,
  updatePermission
);
permissionRouter.delete(
  "/permission/:id",
  verifyUser,
  adminOnly,
  deletePermission
);

export default permissionRouter;
