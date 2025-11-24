// step 1: Import express
const express = require("express");
const router = express.Router();
const { List, Remove, AddCategory } = require("../controllers/category");
const { authCheck, adminCheck } = require("../middleware/authCheck");

// step 3 : define routes
router.post("/category", authCheck, adminCheck, AddCategory);
router.get("/categories", authCheck, adminCheck, List);
router.delete("/category/:id", authCheck, adminCheck, Remove);

// step 2 : create routes
module.exports = router;
