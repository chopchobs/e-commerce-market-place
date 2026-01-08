const express = require("express");
const {
  AddChangeStatus,
  AddChangeRole,
  saveAddress,
  saveUserOrder,
  getUserOrder,
  emptyUserCart,
  createUserCart,
  listUserCart,
} = require("../controllers/user-management");
const route = express();
const { authCheck } = require("../middleware/authCheck");

// --- Cart ---
route.post("/user/cart", authCheck, createUserCart);
route.get("/user/cart", authCheck, listUserCart);
route.delete("/user/cart", authCheck, emptyUserCart);
// --- Address ---
route.post("/user/address", authCheck, saveAddress);
// --- Order ---
route.post("/user/order", authCheck, saveUserOrder);
route.get("/user/order", authCheck, getUserOrder);

module.exports = route;
