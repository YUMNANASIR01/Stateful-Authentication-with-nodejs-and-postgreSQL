// routes\user.routes.js
const express = require("express")
const {signupFunction,  loginFunction, homeFunction, logoutFunction} = require("../controllers/user.controllers")
const {sessionCheckMiddleware} = require ("../middlewares/session-check.middleware")
const {signupValidationMiddleware, loginValidationMiddleware} = require("../middlewares/user.validation.middleware")

const router = express.Router()

// ------------- sign up ------------------------
router.post("/signup", signupValidationMiddleware,signupFunction)

// ------------- login ------------------------
router.post("/login",loginValidationMiddleware, loginFunction)

// ------------- home  -----------------------
// /user/home
router.get("/home",sessionCheckMiddleware, homeFunction)

// ----------------- logout --------------------------
router.post("/logout", logoutFunction)

module.exports = router

