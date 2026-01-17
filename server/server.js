// Step 1 : import express module
const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config(); // load .env file

// Middleware to parse JSON bodies
app.use(morgan("dev")); // show logs in the console server
app.use(express.json({ limit: "30mb" })); // read JSON bodies
app.use(
  cors({
    origin: true,
    credentials: true,
  })
); // to connect to frontend and backend 💕

// ✅read all routes files in the routes folder and register them ;)
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const port = process.env.PORT || 5001;
const host = process.env.HOST || "0.0.0.0";
// Step 2 : Start the Server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
