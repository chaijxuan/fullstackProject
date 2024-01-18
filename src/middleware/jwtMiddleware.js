//jwtMiddleware.js

//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();
//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.generateToken = (req, res, next) => {

  if (!res.locals.userId) {
    return res.status(500).json({ error: "User ID is undefined" });
  }
  
  const payload = {
      userId: res.locals.userId,
      timestamp: new Date()
  };

  const options = {
    algorithm: tokenAlgorithm || "HS256", // Provide a default algorithm if not set
    expiresIn: tokenDuration || "1h",     // Provide a default expiration if not set
};


  try {
      const token = jwt.sign(payload, secretKey, options);
      res.locals.token = token;
      next();
  } catch (err) {
      console.error("Error generating token:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
    res.status(200).json({
      message: res.locals.message,
      token: res.locals.token,
    });
  };/////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      res.locals.userId = decoded.userId;
      res.locals.tokenTimestamp = decoded.timestamp;
  
      next();
    };
  
    jwt.verify(token, secretKey, callback);
  };