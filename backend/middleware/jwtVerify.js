const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Forbidden!" });
  }
};
