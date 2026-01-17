const prisma = require("../config/prisma");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---- Auth ----
// Registration
exports.register = async (req, res, next) => {
  try {
    // code
    const { email, password } = req.body;
    // Validate Email, Pass
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
      name: user.name,
      role: user.role,
    };
    // 4 Generate token 4 process
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error!!" });
      }
      res.status(200).json({ payload, token, message: "Welcome Back!" });
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Login failed" });
  }
};
// ---- Forget,ResetPassword ----
// Forget
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    //  validate - check email
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    // set token limit - 15mins
    // SECRET_KEY - keep to .env
    const token = jwt.sign(
      { id: user.id },
      process.env.SECRET || "SECRET_KEY",
      { expiresIn: "15m" }
    );
    // create link (Frontend URL)
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    // 🔴 LOG LINK ออกมาดูใน Terminal (แทนการส่งอีเมลจริง)
    console.log("SEND EMAIL TO:", email);
    console.log("LINK RESET:", resetLink);

    res.json({
      message: "Password reset link sent to your email (Check Console)",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
// Reset
exports.resetPassword = async (req, res, next) => {
  try {
    // receive
    const { token, newPassword } = req.body;
    // validate token
    const decoded = jwt.verify(token, process.env.SECRET || "SECRET_KEY");
    // hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // update DB
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });
    res.json({ message: "Password Update successfully! Please login." });
  } catch (error) {
    console.log("err", error);
    res.status(400).json({ message: "Token Invalid or expired" });
  }
};

// Fetch current User
exports.currentUser = async (req, res, next) => {
  try {
    // code
    const { id, role, email } = req.user;
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // console.log(user);
    res.status(200).json({
      user,
      message: "Current User fetched successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to fetch current User" });
  }
};
// Fetch current Admin
exports.currentAdmin = async (req, res, next) => {
  try {
    // code
    const { email } = req.user;
    const admin = await prisma.user.findFirst({
      where: { email: email, role: "admin" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    console.log(admin);
    res.status(200).json({
      admin,
      message: "Current Admin fetched successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to fetch current Admin" });
  }
};
