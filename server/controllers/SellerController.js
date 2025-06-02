import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({
        message: "Seller logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Error during seller login:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const isSellerAuth = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = decoded; // Attach seller info to request object
    return res.status(200).json({
      message: "Seller is authenticated",
      seller: {
        email: decoded.email,
      },
    });
  } catch (error) {
    console.error("Error during seller authentication:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
    
  }
};

export const sellerLogout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Seller logged out successfully",
  });
};
