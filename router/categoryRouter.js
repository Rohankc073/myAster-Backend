const express = require("express");
const { addCategory, getCategories, updateCategory, deleteCategory, getCategoriesWithProducts } = require("../controller/CategoryController");

const router = express.Router();

// ✅ Route to add a new category
router.post("/", addCategory);

// ✅ Route to get all categories
router.get("/", getCategories);

// ✅ Route to update a category by ID
router.put("/:id", updateCategory);

// ✅ Route to delete a category by ID
router.delete("/:id", deleteCategory);

router.get("/category/with-products", getCategoriesWithProducts);


module.exports = router;
