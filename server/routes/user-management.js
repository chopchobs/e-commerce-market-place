const express = require('express');
const { ListUsers, AddChangeStatus, 
        AddChangeRole, AddUserCart, 
        ListUserCart, DeleteUserCart, 
        AddAddress, AddUserOrder, 
        ListUserOrder } = require('../controllers/user-management');
const router = express();

router.get('/users',ListUsers);
router.post('/change-status',AddChangeStatus);
router.post('/change-role',AddChangeRole);
router.post('/user/cart',AddUserCart);
router.get('/user/cart',ListUserCart);
router.delete('/user/cart',DeleteUserCart);
router.post('/user/address',AddAddress);
router.post('/user/order',AddUserOrder);
router.get('/user/order',ListUserOrder);

module.exports = router;