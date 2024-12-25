const Service = require('../models/services');

// Add a new service
const addService = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newService = new Service({
      name,
      description,
      price,
      category,
    });

    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    res.status(500).json({ error: 'Error adding service', details: error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services', details: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service', details: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ error: 'Error updating service', details: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting service', details: error.message });
  }
};

module.exports = { addService, getAllServices, getServiceById, updateService, deleteService };
