import mongoose from "mongoose";
import Product from "../models/Product.js";

// This function fetches all products from the database
export const getProducts =  async (req,res)=>{
    try{
        const products = await Product.find({});// find all products
        if(!products || products.length === 0){// no products found
            return res.status(404).json({ success:false, message: "No products found" });
        }
        return res.status(200).json({ success:true, data: products });
    }catch(error){
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ success:false, message: "Internal server error"});
    }
}

// This function creates a new product
export const createproduct = async (req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Name, image and price are required" });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        return res.status(201).json({ success:true, data: newProduct });
    }catch(error){
        console.error("Error creating product:", error.message);
        return res.status(500).json({ success:false, message: "Internal server error"});
    }
}

// This function updates a product by its ID
export const updateProduct = async (req,res)=>{
    const { id } = req.params;
    const product = req.body;

    // Check if the product ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ success:false, message: "Invalid product ID" });
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if(!updatedProduct){
            return res.status(404).json({ success:false, message: "Product not found" });
        }
        return res.status(200).json({ success:true, data: updatedProduct });
    }catch(error){
        console.error("Error updating product:", error.message);
        return res.status(500).json({ success:false, message: "Internal server error"});
    }
}

// This function deletes a product by its ID
export const deleteProduct = async (req,res)=>{
    const { id } = req.params;
    try{
        // Check if the product ID is valid
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({ success:false, message: "Product not found" });
        }
        return res.status(200).json({ success:true, message:"Product deleted" ,data: product });
    }catch(error){
        console.error("Error deleting product:", error.message);
        return res.status(500).json({ success:false, message: "Internal server error"});
    }
}