const express = require('express');
const multer = require('multer');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require('../controller/doctorController');

const router = express.Router();

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/save', upload.single('image'), createDoctor); // Create doctor with image upload
router.get('/getAll', getAllDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', upload.single('image'), updateDoctor); // Allow updating with image
router.delete('/:id', deleteDoctor);

module.exports = router;
