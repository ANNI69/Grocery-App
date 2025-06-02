import express from 'express';
import {
    addAddress,
    getAddress
} from '../controllers/AddressController.js';

const addressRouter = express.Router();

// Route to add a new address
addressRouter.post('/add', addAddress);

// Route to get address by user ID
addressRouter.get('/get', getAddress);


export default addressRouter;