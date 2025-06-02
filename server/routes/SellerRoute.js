import { sellerLogin, sellerLogout, isSellerAuth } from "../controllers/SellerController.js";
import express from "express";
import authSeller from "../middleware/authSeller.js";

const sellerRouter = express.Router();

// Seller login route
// POST /api/seller/login
sellerRouter.post("/login", sellerLogin);

// Seller authentication route
// GET /api/seller/isAuth
sellerRouter.get("/isAuth", authSeller,  isSellerAuth);

// Seller logout route
// POST /api/seller/logout
sellerRouter.post("/logout", sellerLogout);

export default sellerRouter;