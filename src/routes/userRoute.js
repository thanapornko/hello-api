const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.patch("/info", userController.userInfo);
router.post("/physical", userController.userPhysical);

module.exports = router;
