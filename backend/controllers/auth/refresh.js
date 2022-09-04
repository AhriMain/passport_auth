const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const refresh = req.cookies.jwt;

    const { username, _id } = jwt.verify(refresh, process.env.REFRESH_KEY);

    const access = jwt.sign({ username, _id }, process.env.ACCESS_KEY, {
      expiresIn: "1m",
    });

    return res.status(200).json({ msg: "gorgeous!!", access });
    // const refreshToken = await Refresh.findOne();
  } catch (er) {
    return res.status(403).json(er.message, "login again");
  }
};
