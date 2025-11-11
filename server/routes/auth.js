// Step 1: Import express module
const express = require('express');
const router = express.Router();


// Step 3: Create a router
router.get('/register', (req, res) => {
    // code
    res.send({ message: 'Register Route' });
});


// Step 2: Import auth routes
module.exports = router;