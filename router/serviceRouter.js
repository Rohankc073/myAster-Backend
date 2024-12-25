const express = require('express');
const {
  addService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../controller/serviceController');

const router = express.Router();

// Add a new service
router.post('/add', addService);

// Get all services
router.get('/get', getAllServices);

// Get a single service by ID
router.get('/:id', getServiceById);

// Update a service
router.put('/:id', updateService);

// Delete a service
router.delete('/:id', deleteService);

module.exports = router;
