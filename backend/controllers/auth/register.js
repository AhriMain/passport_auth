require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Refresh = require("../../models/Refresh");

module.exports = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) return res.status(400).json({ msg: "user already exists!!" });

    const createdUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const access = jwt.sign(
      { username, _id: createdUser._id },
      process.env.ACCESS_KEY,
      { expiresIn: "30s" }
    );
    const refresh = jwt.sign(
      { username, _id: createdUser._id },
      process.env.REFRESH_KEY,
      { expiresIn: "2m" }
    );

    res.cookie("jwt", refresh);

    return res.status(200).json({ msg: "register success!", access });
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};
