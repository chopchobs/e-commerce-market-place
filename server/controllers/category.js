const prisma = require("../config/prisma");
// Create, List, Remove Category Controllers

// Create Category - Body
exports.AddCategory = async (req, res, next) => {
  try {
    // code
    const { name } = req.body;
    // Validate name
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    // Check for duplicate
    const checkDuplicate = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });
    // If duplicate found
    if (checkDuplicate) {
      return res.status(400).json({ message: "Category already exists" });
    }
    // Create Category
    const AddNameCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.status(200).json({
      AddNameCategory,
      message: "Add Name Successful",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to create category" });
  }
};
// Read Categories - findMany
exports.List = async (req, res, next) => {
  try {
    // code
    const ListCategoryName = await prisma.category.findMany();
    res.status(200).json({
      ListCategoryName,
      message: "List Name of Category successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
// Update Category - Params, Body
exports.Update = async (req, res, next) => {
  try {
    // code
    const { id } = req.params;
    const { name } = req.body;
    const UpdateCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    res
      .status(200)
      .json({ UpdateCategory, message: "Updated Category successfully" });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).json({ message: "Failed to update category" });
  }
};
// Delete Category - Params
exports.Remove = async (req, res, next) => {
  try {
    // code
    const { id } = req.params;
    const Remove = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ Remove, message: "Deleted Category successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
