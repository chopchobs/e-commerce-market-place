const express = require('express');
const { ListUsers, AddChangeStatus, 
        AddChangeRole, AddUserCart, 
        ListUserCart, DeleteUserCart, 
        AddAddress, AddUserOrder, 
        ListUserOrder } = require('../controllers/user-management');
const router = express();
const { authCheck, adminCheck } = require('../middleware/authCheck')

router.get('/users',authCheck,adminCheck,ListUsers);  
router.post('/change-status',authCheck,adminCheck,AddChangeStatus);
router.post('/change-role',authCheck,adminCheck,AddChangeRole);

router.get('/user/cart',authCheck,ListUserCart);
router.delete('/user/cart',authCheck,DeleteUserCart);
router.post('/user/cart',authCheck,AddUserCart);

router.post('/user/address',AddAddress);
router.post('/user/order',AddUserOrder);
router.get('/user/order',ListUserOrder);

module.exports = router;