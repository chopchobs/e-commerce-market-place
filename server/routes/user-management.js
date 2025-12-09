const express = require("express");
const {
  ListUsers,
  AddChangeStatus,
  AddChangeRole,
  saveAddress,
  saveUserOrder,
  getUserOrder,
  emptyUserCart,
  createUserCart,
  listUserCart,
} = require("../controllers/user-management");
const router = express();
const { authCheck, adminCheck } = require("../middleware/authCheck");

router.get("/users", authCheck, adminCheck, ListUsers);
router.post("/change-status", authCheck, adminCheck, AddChangeStatus);
router.post("/change-role", authCheck, adminCheck, AddChangeRole);
// --- Cart ---
router.post("/user/cart", authCheck, createUserCart);
router.get("/user/cart", authCheck, listUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);
// --- Address ---
router.post("/user/address", authCheck, saveAddress);
// --- Order ---
router.post("/user/order", authCheck, saveUserOrder);
router.get("/user/order", authCheck, getUserOrder);

module.exports = router;
