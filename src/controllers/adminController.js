const { sequelize } = require("../models/index");
const {
  validatePersonal
} = require("../validators/personalValidator");
const { User, Physical } = require("../models");
const createError = require("../utils/createError");

exports.getAllUser = async (req, res, next) => {
  try {
    const userInfo = await User.findAll({
      where: { isAdmin: false }
    });
    res.status(200).json({ userInfo });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // console.log("---PARAMS---", req.params);
    await User.destroy({
      where: { id: req.params.id },
      include: [
        {
          model: Physical,
          where: { userId: req.params.id }
        }
      ]
    });
    res
      .status(200)
      .json({ message: "Successfully Deleted!" });
  } catch (err) {
    next(err);
  }
};

exports.editUser = async (req, res, next) => {
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

    await User.update(value, {
      where: { id: req.body.id }
    });
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

exports.getAllRecord = async (req, res, next) => {
  try {
    const record = await Physical.findAll({
      include: {
        model: User
      },
      order: [["date", "DESC"]]
    });
    res.status(200).json({ record });
  } catch (err) {
    next(err);
  }
};

exports.getUserAvgRecord = async (req, res, next) => {
  try {
    const record = await Physical.findAll({
      attributes: [
        "userId",
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("weight")),
            2
          ),
          "avgWeight"
        ],
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("height")),
            2
          ),
          "avgHeight"
        ],
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("waist")),
            2
          ),
          "avgWaist"
        ]
      ],
      include: {
        model: User
      },
      group: ["userId"]
    });
    res.status(200).json({ record });
  } catch (err) {
    next(err);
  }
};
