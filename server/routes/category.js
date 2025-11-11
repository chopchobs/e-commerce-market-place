// step 1: Import express
const express = require('express');
const router = express.Router();
const { Add,List,Remove} = require('../controllers/category');

// step 3 : define routes
router.post('/category', Add);
router.get('/categories', List);
router.delete('/category/:id', Remove);


// step 2 : create routes
module.exports = router;