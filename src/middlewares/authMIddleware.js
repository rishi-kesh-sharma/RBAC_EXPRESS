const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.auth;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      req.user = decodedToken;

      next();
    }
  } catch (err) {}
};

module.exports = { verifyToken };
