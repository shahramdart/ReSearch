import express from "express";
const listingRouter = express.Router();
import { verifyUser, adminOnly } from "../middleware/auth.js";
import {
  getAllListing,
  getListingById,
  addListing,
  deletListing,
} from "../controller/house_listing_controller.js";

listingRouter.get("/listing", getAllListing);
listingRouter.get("/listing/:id", getListingById);
listingRouter.post("/listing", verifyUser, adminOnly, addListing);
listingRouter.delete("/listing/:id", verifyUser, adminOnly, deletListing);

export default listingRouter;
