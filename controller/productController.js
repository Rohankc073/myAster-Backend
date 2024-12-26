const Product = require('../models/products');
const fs = require('fs');
const path = require('path');

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? `/uploads/product/${req.file.filename}` : null; // Local image path

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

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Get product ID from URL
        const { name, price, description } = req.body;

        // Handle image update if provided
        let updatedData = { name, price, description };
        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`; // Save new image path
        }

        // Update the product in the database
        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the image if it exists
        if (product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            fs.unlinkSync(imagePath); // Delete image from uploads folder
        }

        // Delete the product
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL params
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct,getProductById };
