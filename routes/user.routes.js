// routes\user.routes.js
const express = require("express")
const {signupFunction,  loginFunction} = require("../controllers/user.controllers")

const router = express.Router()

// ------------- sign up ------------------------
router.post("/signup", signupFunction)

// ------------- login ------------------------
router.post("/login", loginFunction)


module.exports = router

