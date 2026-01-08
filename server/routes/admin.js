const express = require("express");
const {
  ListAdminOrder,
  changOrderStatusAdmin,
  deleteOrderAdmin,
  getListUsersAdmin,
  AddChangeStatus,
  AddChangeRole,
} = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const route = express();
// --- User Management ---
// Get - List Users (Admin)
route.get("/admin/users", authCheck, adminCheck, getListUsersAdmin);
route.post("/admin/change-role", authCheck, adminCheck, AddChangeRole);
route.post("/admin/change-status", authCheck, adminCheck, AddChangeStatus);
// ---- order ----
route.put("/admin/order-status", authCheck, adminCheck, changOrderStatusAdmin);
route.get("/admin/orders", authCheck, adminCheck, ListAdminOrder);
route.delete(
  "/admin/order-delete/:id",
  authCheck,
  adminCheck,
  deleteOrderAdmin
);

module.exports = route;
