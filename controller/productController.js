const Product = require('../models/products');
const fs = require('fs');
const path = require('path');

// ✅ Add a new product (Medicine)
const addProduct = async (req, res) => {
    try {
        const { name, genericName, manufacturer, price, quantity, dosage, requiresPrescription, category, description } = req.body;
        const image = req.file ? `/uploads/products/${req.file.filename}` : "/uploads/products/default.jpg"; // Default image if none is uploaded

        const product = new Product({
            name,
            genericName,
            manufacturer,
            price,
            quantity,
            dosage,
            requiresPrescription,
            category,
            description,
            image,
        });

        await product.save();
        res.status(201).json({ message: '✅ Product added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Fetch all medicines (Ensure image URL is correct)
const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
    //   console.log("Total products found:", products.length); // ✅ Check how many products exist
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  };

// ✅ Fetch product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: '❌ Product not found' });

        // Update image URL
        const updatedProduct = {
            ...product._doc,
            image: product.image.startsWith("/uploads")
                ? `http://localhost:5003${product.image}`
                : product.image
        };

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, genericName, manufacturer, price, quantity, dosage, requiresPrescription, category, description } = req.body;

        let updatedData = { name, genericName, manufacturer, price, quantity, dosage, requiresPrescription, category, description };

        // If a new image is uploaded, update the image path
        if (req.file) {
            updatedData.image = `/uploads/products/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!product) return res.status(404).json({ message: '❌ Product not found' });

        res.status(200).json({ message: '✅ Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure product exists before deleting
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: '❌ Product not found' });
        }

        // Delete the product image from the server if exists
        if (product.image && product.image !== "/uploads/products/default.jpg") {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete file safely
            }
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: '✅ Product deleted successfully' });

    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct, getProductById };
