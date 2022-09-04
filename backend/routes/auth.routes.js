const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const jwtVerify = require("../middleware/jwtVerify");
const { login, register, refresh } = require("../controllers/auth");

// schema
const registerSchema = joi.object({
  email: joi.string().email(),
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(20).required(),
});

const loginSchema = joi.object({
  email: joi.string().email(),
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(20).required(),
});

router.post("/register", validator.body(registerSchema), register);

router.post("/login", validator.body(loginSchema), login);

router.get("/protect", jwtVerify, (req, res) =>
  res.json({ msg: "very very secrect tips bro!" })
);

router.get("/refresh", refresh);

module.exports = router;
