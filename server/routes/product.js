// step 1: Import express
const express = require('express');
const router = express.Router();
const { AddProduct, 
        ListProduct,
        ListProductByFilters, 
        RemoveProduct, 
        SearchFilters, 
        UpdateProduct,
        ReadProduct,
        } = require('../controllers/product');

// step 3 : define routes
router.post('/product', AddProduct);
router.get('/products/:count', ListProduct);
router.get('/product/:id', ReadProduct);
router.put('/product/:id',UpdateProduct);
router.delete('/product/:id', RemoveProduct);
router.post('/product-by', ListProductByFilters);
router.post('/search/filters', SearchFilters );


// step 2 : create routes
module.exports = router;