const express = require('express');
const router = express.Router();
const { addPackage, getPackages, getPackageById, updatePackage, deletePackage, upload } = require('../controller/packageController');

// Routes
router.post('/', upload.single('image'), addPackage);
router.get('/', getPackages);
router.get('/:id', getPackageById);
router.put('/:id', upload.single('image'), updatePackage);
router.delete('/:id', deletePackage);

module.exports = router;
