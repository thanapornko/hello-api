const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAllUser);
router.delete("/:id", adminController.deleteUser);
router.patch("/:id", adminController.editUser);
router.get("/record", adminController.getAllRecord);

module.exports = router;
