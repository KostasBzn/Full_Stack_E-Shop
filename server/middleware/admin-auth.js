import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECTER_KEY);
    req.admin = decoded;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default adminAuth;
