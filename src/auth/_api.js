const express = require("express");
const { register, login } = require("./controller");
const { registerValidation, loginValidation } = require("./validation");
const validation = require("../middleware/validation");
const router = express.Router();

router.post("/register", registerValidation(), validation, register);
router.post("/login", loginValidation(), validation, login);

module.exports = router;
