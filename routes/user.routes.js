// routes\user.routes.js
const express = require("express")
const {signupFunction,  loginFunction, homeFunction} = require("../controllers/user.controllers")
const {sessionCheckMiddleware} = require ("../middlewares/session-check.middleware")

const router = express.Router()

// ------------- sign up ------------------------
router.post("/signup", signupFunction)

// ------------- login ------------------------
router.post("/login", loginFunction)

// ------------- home  ------------------------
// /user/home
router.get("/home",sessionCheckMiddleware, homeFunction)


module.exports = router

