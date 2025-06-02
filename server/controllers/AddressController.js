import bcrypt from "bcryptjs";
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      phone,
    } = req.body;

    const newAddress = new Address({
      userId,
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      phone,
    });

    await Address.create({
      ...newAddress,
      userId,
    });
    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding address", error: error.message });
  }
};

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.params;
    
        const address = await Address.find({ userId });
        if (!address || address.length === 0) {
            return res.status(404).json({ message: "No address found for this user" });
        }
        res.status(200).json({ address });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching address", error: error.message });
    }
}

