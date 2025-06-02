import express from 'express';

import {
    addProduct,
    productList,
    productById,
    changeStock,
    } from '../controllers/ProductController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';

const productRouter = express.Router();

// Route to create a new product
productRouter.post('/add',upload.array(["images"]), addProduct);

// Route to get all products
productRouter.get('/list', productList);

// Route to get a product by ID
productRouter.get('/id', productById);

// Route to update a product
productRouter.put('/stock',authSeller, changeStock);

export default productRouter;



