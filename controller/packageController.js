const Package = require('../models/package');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 📌 Configure Multer for Image Upload (Same as Product Controller)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

/** 
 * ✅ Add a new Package
 * - Allows users to add a package with an optional image.
 */
const addPackage = async (req, res) => {
    try {
        const { name, description, price, duration, servicesIncluded } = req.body;

        // ✅ Ensure the image is stored correctly
        const image = req.file ? req.file.path : null;

        const newPackage = new Package({
            name,
            description,
            price,
            duration,
            servicesIncluded: servicesIncluded ? servicesIncluded.split(',') : [],
            image,
        });

        await newPackage.save();
        res.status(201).json({ message: '✅ Package added successfully', package: newPackage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** 
 * ✅ Fetch all Packages
 * - Ensures full image URL for frontend usage.
 */
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({});

        // ✅ Ensure full image URL
        const updatedPackages = packages.map((pkg) => ({
            ...pkg._doc,
            image: pkg.image ? `http://localhost:5003/${pkg.image}` : null,
        }));

        res.status(200).json(updatedPackages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ error: "Error fetching packages" });
    }
};

/** 
 * ✅ Fetch a single package by ID
 */
const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const pkg = await Package.findById(id);
        if (!pkg) return res.status(404).json({ message: '❌ Package not found' });

        // ✅ Ensure full image URL
        pkg.image = pkg.image ? `http://localhost:5003/${pkg.image}` : null;

        res.status(200).json(pkg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** 
 * ✅ Update a package
 * - Allows updating package details, including image.
 */
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, duration, servicesIncluded } = req.body;

        let updatedData = { name, description, price, duration, servicesIncluded: servicesIncluded ? servicesIncluded.split(',') : [] };

        // ✅ If a new image is uploaded, update the image path
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const pkg = await Package.findByIdAndUpdate(id, updatedData, { new: true });
        if (!pkg) return res.status(404).json({ message: '❌ Package not found' });

        res.status(200).json({ message: '✅ Package updated successfully', package: pkg });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** 
 * ✅ Delete a package
 * - Removes the package and its associated image from the server.
 */
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Ensure the package exists before deleting
        const pkg = await Package.findById(id);
        if (!pkg) {
            return res.status(404).json({ message: '❌ Package not found' });
        }

        // ✅ Delete the package image from the server if it exists
        if (pkg.image) {
            const imagePath = path.join(__dirname, '..', pkg.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete file safely
            }
        }

        await Package.findByIdAndDelete(id);
        res.status(200).json({ message: '✅ Package deleted successfully' });

    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addPackage, getPackages, getPackageById, updatePackage, deletePackage, upload };
