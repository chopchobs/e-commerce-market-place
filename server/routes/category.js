// step 1: import express
const express = require('express');
const router = express.Router();


// step 3 : create route
router.get('/categories', (req, res) => {
    // code
    res.send({ message: 'Categories Route' });
});



// step 2 : create routes
module.exports = router;