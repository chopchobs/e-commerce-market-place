// step 1: Import express
const express = require('express');
const router = express.Router();
const { AddProduct, 
        ListProduct,
        ListProductByFilters, 
        RemoveProduct, 
        SearchFilters } = require('../controllers/product');

// step 3 : define routes
router.post('/product', AddProduct);
router.get('/product/:id', ListProduct);
router.delete('/product/:id', RemoveProduct);
router.post('/product-by', ListProductByFilters);
router.post('/search/filters', SearchFilters );


// step 2 : create routes
module.exports = router;