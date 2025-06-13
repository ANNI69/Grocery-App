import Order from "../models/Order.js";
import Product from "../models/Product.js";

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
    
        // Create a new order
        const order = await Order.create({
            user: userId,
            items,
            amount,
            address,
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
        const { userId } = req.body;
    
        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
    
        // Fetch orders for the user
        const orders = await Order.find({ 
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
         }).populate("items.product address").sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });  
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

