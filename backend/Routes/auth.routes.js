import express from "express";
const authRouter = express.Router();
import { login, logout, getUser } from "../controller/auth.js";

authRouter.get("/getUser", getUser);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);

export default authRouter;
