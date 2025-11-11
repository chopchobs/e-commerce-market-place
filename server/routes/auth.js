// Step 1: Import express module
const express = require('express');
const router = express.Router();
const { register, 
        login,
        currentUser, 
        currentAdmin } = require('../controllers/auth');

// Step 3: Create a router
router.post('/register', register);
router.post('/login', login);
router.post('/current-user',currentUser)
router.post('/current-admin',currentAdmin)


// Step 2: Import auth routes
module.exports = router;