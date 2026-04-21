import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // ❌ token nahi hai
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated (no token)",
      });
    }

    // ❌ invalid token
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // ❌ extra safety (optional but good)
    if (!verifyToken || !verifyToken.userId) {
      return res.status(401).json({
        message: "Token verification failed",
      });
    }

    // ✅ sab sahi
    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in isAuth",
    });
  }
};

export default isAuth;