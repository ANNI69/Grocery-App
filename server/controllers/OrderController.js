import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentType } = req.body;
    
        // Validate required fields
        if (!userId || !items || !amount || !address || !paymentType) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
    
        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId" });
        }
        if (!mongoose.Types.ObjectId.isValid(address)) {
            return res.status(400).json({ success: false, message: "Invalid address" });
        }
        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                return res.status(400).json({ success: false, message: `Invalid product id: ${item.product}` });
            }
        }
    
        // Convert product IDs to ObjectId
        const itemsWithObjectId = items.map(item => ({
            ...item,
            product: new mongoose.Types.ObjectId(item.product)
        }));
        // Convert address to ObjectId
        const addressObjId = new mongoose.Types.ObjectId(address);
        // Create a new order
        const order = await Order.create({
            user: userId,
            items: itemsWithObjectId,
            amount,
            address: addressObjId,
            paymentType,
            isPaid: false, // COD orders are not paid immediately
            status: "Order Placed"
        });

        res.status(201).json({ 
            success: true,
            message: "Order placed successfully", 
            order 
        });
    }
    catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ 
            success: false,
            message: "Error placing order", 
            error: error.message 
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id; // from authUser middleware

        // Fetch orders for the user
        const orders = await Order.find({ 
            user: userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
         }).populate("items.product address").sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(200).json({ orders: [] });  // Return empty array if no orders
        }
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user items.product address").sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}

