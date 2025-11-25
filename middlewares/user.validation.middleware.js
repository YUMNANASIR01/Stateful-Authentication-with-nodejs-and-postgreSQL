// middlewares\user.validation.middleware.js
const {signupValidationSchema, loginValidationSchema} = require("../validators/user.validation.schema")

exports.signupValidationMiddleware = (req, res, next) => {
      // ---------------- sign up -------------------------
    // schema parse coming data
    //   const {username,email, password} = req.body
    try{
        signupValidationSchema.parse(req.body)
        next()
    }
    catch(error){
        return res.status(400).json({message : "Invalid email or password", error : error})
    }
}
// --------------------- login validation middleware ---------------------
exports.loginValidationMiddleware = (req, res, next) => {
      // ---------------- sign up -------------------------
    // schema parse coming data
    //   const {username,email, password} = req.body
    try{
        loginValidationSchema.parse(req.body)
        next()
    }
    catch(error){
       return res.status(400).json({message : "Invalid email or password", error : error})
    }
}
