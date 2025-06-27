import express from "express";
import { me, login, logout, register } from "../controllers/UserController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", register);
// Login
userRouter.post("/login", login);
// Get current user session
userRouter.get("/me", authUser, me);
// Logout
userRouter.get("/logout", logout);

export default userRouter;