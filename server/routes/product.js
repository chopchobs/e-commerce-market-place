// step 1: Import express
const express = require("express");
const router = express.Router();
const {
  AddProduct,
  ListProduct,
  RemoveProduct,
  UpdateProduct,
  ReadProduct,
  ListProductByFilters,
  SearchFilter,
  UploadImages,
  RemoveImage,
} = require("../controllers/product");
const { authCheck, adminCheck } = require("../middleware/authCheck");

// step 3 : define routes
router.post("/product", authCheck, adminCheck, AddProduct);
router.get("/products/:count", authCheck, adminCheck, ListProduct);
router.get("/product/:id", authCheck, adminCheck, ReadProduct);
router.put("/product/:id", authCheck, adminCheck, UpdateProduct);
router.delete("/product/:id", authCheck, adminCheck, RemoveProduct);
router.post("/product-by", authCheck, adminCheck, ListProductByFilters);
router.post("/search/filter", authCheck, adminCheck, SearchFilter);
// Image - Add,delete
router.post("/image", authCheck, adminCheck, UploadImages);
router.post("/removeImage", authCheck, adminCheck, RemoveImage);

// step 2 : create routes
module.exports = router;
