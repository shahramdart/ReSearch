import express from "express";
const imagesRouter = express.Router();
import { upload } from "../middleware/upload.js";
import { verifyUser } from "../middleware/auth.js";
import {
  getAllImages,
  getImageById,
  addImages,
  deleteImageById,
} from "../controller/images_controller.js";

imagesRouter.get("/images", verifyUser, getAllImages);
imagesRouter.get("/images/:id", verifyUser, getImageById);
imagesRouter.post("/images", verifyUser, upload.array("images", 5), addImages);
imagesRouter.delete("/images/:id", verifyUser, deleteImageById);

export default imagesRouter;
