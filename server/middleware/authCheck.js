const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

// Check all Users
exports.authCheck = async (req, res, next) => {
  try {
    // code
    const handToken = req.headers.authorization;
    if (!handToken) {
      return res.status(400).send({
        message: " No Token, Authorization",
      });
    }
    const token = handToken.split(" ")[1]; //  [ Bearer[0], Token[1] ]
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode; // throw decode to req.user run anyway for mid
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
    });
    if (!user.enabled) {
      return res.status(400).json({
        message: "This account can not access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Token Invalid",
    });
  }
};

// Check User for role Admin only
exports.adminCheck = async (req, res, next) => {
  try {
    // code
    const { email } = req.user;
    const adminUsers = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!adminUsers || adminUsers.role !== "admin") {
      return res.status(403).send({
        message: "Access Denied: Admin Only!!",
      });
    }
    // console.log('Admin Check:',adminUsers);
    next();
  } catch (error) {
    next(error);
    res.status(400).send({
      message: "Error Admin access denied!!",
    });
  }
};
