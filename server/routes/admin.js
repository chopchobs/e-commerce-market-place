const express = require("express");
const {
  ListAdminOrder,
  changOrderStatusAdmin,
  deleteOrderAdmin,
} = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const route = express();

route.put("/admin/order-status", authCheck, adminCheck, changOrderStatusAdmin);
route.get("/admin/orders", authCheck, adminCheck, ListAdminOrder);
route.delete(
  "/admin/order-delete/:id",
  authCheck,
  adminCheck,
  deleteOrderAdmin
);

module.exports = route;
