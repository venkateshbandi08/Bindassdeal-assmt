const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-token"];
  if (!token) {
    return res.json({ msg: "Token is Required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ msg: "Token not matched" });
    }
    req.user = decoded;
    next();
  } catch (ex) {
    return res.json({ msg: "Invalid Token" });
  }
};
