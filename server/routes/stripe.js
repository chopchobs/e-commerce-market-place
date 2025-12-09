const express = require("express");
const { authCheck } = require("../middleware/authCheck");
const { Payment } = require("../controllers/stripe");
const route = express();

route.post("/user/create-payment-intent", authCheck, Payment);

module.exports = route;
