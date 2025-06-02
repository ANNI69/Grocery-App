import express from "express";
import { isAuth, login, logout, register } from "../controllers/UserController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// APi url: /api/user/register
userRouter.post("/register", register);

// APi url: /api/user/login
userRouter.post("/login", login);

// APi url: /api/user/isAuth
userRouter.get("/isAuth", authUser, isAuth);

// APi url: /api/user/logout
userRouter.get("/logout", logout);


export default userRouter;