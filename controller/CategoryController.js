const Category = require("../models/category");

// ✅ Add a new category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ success: true, message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error: error.message });
  }
};

// ✅ Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const product = await Product.findOne({ category: category._id }).select("image").lean();
        return { ...category, products: product ? [product] : [] };
      })
    );

    res.status(200).json(categoriesWithProducts);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// ✅ Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

// ✅ Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory, getCategoriesWithProducts };
