const Product = require('../models/products');
const fs = require('fs');
const path = require('path');

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Local image path

        const product = new Product({
            name,
            price,
            description,
            image, // Save the image path to the database
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async(req,res) => {
    
}

module.exports = { addProduct, getProducts };
