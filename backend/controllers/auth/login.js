const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log(username);
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "Incorrect username/password!" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "Incorrect username/password!" });

    const access = jwt.sign(
      { username, _id: user._id },
      process.env.ACCESS_KEY,
      { expiresIn: "30s" }
    );
    const refresh = jwt.sign(
      { username, _id: user._id },
      process.env.REFRESH_KEY,
      { expiresIn: "30min" }
    );

    res.cookie("jwt", refresh);

    return res.status(200).json({ msg: "login success!", access });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "something went wrong" });
  }
};
