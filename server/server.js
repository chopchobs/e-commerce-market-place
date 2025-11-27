// Step 1 : import express module
const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(morgan("dev")); // show logs in the console server
app.use(express.json({ limit: "30mb" })); // read JSON bodies
app.use(cors()); // to connect to frontend and backend 💕

// ✅read all routes files in the routes folder and register them ;)
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// Step 2 : Start the Server
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
