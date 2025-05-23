import express from 'express';
const router = express.Router();
import { createproduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

router.get("/",getProducts);

router.post("/", createproduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;