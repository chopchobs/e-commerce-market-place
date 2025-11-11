const express = require('express');
const { EditUserOrder, ListAdminOrder } = require('../controllers/admin');
const route = express();

route.put('/user/order',EditUserOrder);
route.get('/admin/orders',ListAdminOrder);


module.exports= route;