const {
  validateRegister,
  validateLogin
} = require("../validators/authValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    // console.log("---value---", value);
    const user = await User.findOne({
      where: { email: value.email }
    });
    if (user) {
      throw createError("email is already in use", 400);
    }
    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);
    res.status(201).json({
      message: "register succesfully"
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    // console.log("---value---", value);
    const user = await User.findOne({
      where: { email: value.email }
    });
    if (!user) {
      throw createError("invalid email or password", 400);
    }
    const isCorrect = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      throw createError("invalid email or password", 400);
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        idCard: user.idCard,
        telephone: user.telephone,
        isNewUser: user.isNewUser,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};
