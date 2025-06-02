import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrders, getOrderById, placeOrderCOD } from '../controllers/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.post('/cod', authUser, placeOrderCOD);
OrderRouter.get('/user', authUser, getOrderById);
OrderRouter.get('/all', authUser, getAllOrders);

export default OrderRouter;