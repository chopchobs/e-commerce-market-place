const prisma = require("../config/prisma");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
exports.register = async (req, res, next) => {
  try {
    // code
    const { email, password } = req.body;
    // Step 1: IF NOT email, password
    if (!email) {
      res.status(500).json({ message: "Email is required !!" });
    }
    if (!password) {
      res.status(500).json({ message: "Password is required !!" });
    }

    // Step 2: Check Email DB
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({
        message: "User Already Exits!!",
      });
    }
    // Step 3: Check Password - hashPassword
    const hashPassword = await bcryptjs.hash(password, 10);

    // Step 4: Create email,password
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.status(200).send({
      user,
      message: "Registration Successful",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    //code
    const { email, password } = req.body;
    // 1 check email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res.status(400).json({
        message: "Email Not Found or Not Enabled!!",
      });
    }
    // 2 check password
    const CheckPassword = await bcryptjs.compare(password, user.password);
    if (!CheckPassword) {
      return res.status(400).json({
        message: "Password Invalid!!",
      });
    }
    // 3 payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // 4 Generate token 4 process
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error!!" });
      }
      res.status(200).json({ payload, token, message: "Login successful" });
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Fetch current User
exports.currentUser = async (req, res, next) => {
  try {
    // code

    res.status(200).send({ message: "Current User fetched successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to fetch current User" });
  }
};

// Fetch current Admin
exports.currentAdmin = async (req, res, next) => {
  try {
    // code

    res.status(200).send({ message: "Current Admin fetched successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to fetch current Admin" });
  }
};
