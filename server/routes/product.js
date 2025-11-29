// step 1: import modules
const express = require("express");
const router = express.Router();
const {
  AddProduct,
  ListProduct,
  RemoveProduct,
  ReadProduct,
  ListProductByFilters,
  SearchFilter,
  UploadImages,
  RemoveImage,
  UpdateProducts,
} = require("../controllers/product");
const { authCheck, adminCheck } = require("../middleware/authCheck");

// step 3 : create routes - CRUD
router.post("/product", authCheck, adminCheck, AddProduct);
router.get("/products/:count", authCheck, adminCheck, ListProduct);
router.get("/product/:id", authCheck, adminCheck, ReadProduct);
router.put("/product/:id", authCheck, adminCheck, UpdateProducts);
router.delete("/product/:id", authCheck, adminCheck, RemoveProduct);
router.post("/product-by", authCheck, adminCheck, ListProductByFilters);
router.post("/search/filter", authCheck, adminCheck, SearchFilter);

// Image Upload
router.post("/image", authCheck, adminCheck, UploadImages);
router.post("/removeImage", authCheck, adminCheck, RemoveImage);

// step 2 : export the router
module.exports = router;
