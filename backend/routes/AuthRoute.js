// routes/authRoutes.js
const express = require("express");
const { createSecretToken } = require("../utils/SecretToken");
const { Signup, Login } = require("../Controllers/AuthController");
const {userVerification} = require("../middlewares/AuthMiddleware")


const router = express.Router();

router.post("/signup", Signup);

router.post('/',userVerification)

router.post("/login", Login)


module.exports = router;
