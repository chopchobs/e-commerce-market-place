const express = require('express');
const { ListUsers, AddChangeStatus, 
        AddChangeRole,  
         saveAddress,
        saveUserOrder, getUserOrder,
        emptyUserCart, 
        UserCart,
        getUserCart} = require('../controllers/user-management');
const router = express();
const { authCheck, adminCheck } = require('../middleware/authCheck')

router.get('/users',authCheck,adminCheck,ListUsers);  
router.post('/change-status',authCheck,adminCheck,AddChangeStatus);
router.post('/change-role',authCheck,adminCheck,AddChangeRole);

router.post('/user/cart',authCheck,UserCart);
router.get('/user/cart',authCheck,getUserCart);
router.delete('/user/cart',authCheck,emptyUserCart);

router.post('/user/address',authCheck,saveAddress);

router.post('/user/order',authCheck,saveUserOrder);
router.get('/user/order',authCheck,getUserOrder);

module.exports = router;