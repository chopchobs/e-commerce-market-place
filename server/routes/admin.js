const express = require("express");
const { EditUserOrder, ListAdminOrder } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const route = express();

route.put("/user/order", authCheck, adminCheck, EditUserOrder);
route.get("/admin/orders", authCheck, adminCheck, ListAdminOrder);

module.exports = route;
