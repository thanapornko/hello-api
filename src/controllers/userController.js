const {
  validatePersonal
} = require("../validators/personalValidator");
const {
  validatePhysical
} = require("../validators/physicalValidator");
const { User, Physical } = require("../models");
const createError = require("../utils/createError");

exports.userInfo = async (req, res, next) => {
  try {
    const value = validatePersonal(req.body);
    // console.log("---value---", value);
    const userWithIdCard = await User.findOne({
      where: { idCard: value.idCard }
    });
    // console.log("---USERWITHIDCARD---", userWithIdCard);
    if (
      userWithIdCard &&
      userWithIdCard.id !== req.body.id
    ) {
      throw createError("id card is already in use", 400);
    }
    if (!req.body.id) {
      const newUser = await User.create({
        ...value,
        isNewUser: true
      });
      req.body.id = newUser.id;
    } else {
      await User.update(
        {
          ...value,
          isNewUser: false
        },
        {
          where: { id: req.body.id }
        }
      );
    }
    res.status(200).json({
      message: "add personal info succesfully"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};

exports.userPhysical = async (req, res, next) => {
  try {
    const existingRecord = await Physical.findOne({
      where: {
        userId: req.body.userId,
        date: new Date(req.body.date)
      }
    });
    if (existingRecord) {
      throw createError(
        "You have already created a physical record for today",
        400
      );
    }
    const value = validatePhysical(req.body);
    // console.log("---value---", value);
    await Physical.create(value);
    res.status(200).json({
      message: "add physical info succesfully"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};
