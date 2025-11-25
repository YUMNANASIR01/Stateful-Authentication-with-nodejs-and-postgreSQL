// validators\user.validation.schema.js
const {z} = require("zod")

exports.signupValidationSchema = z.object({
    username : z.string().min(1, "username is required"),
    email : z.email("invalid email format"),
    password : z.string().min(6, "password must be at least 6 characters")
})

// --------------------- login validation schema ---------------------
exports.loginValidationSchema = z.object({
    email : z.email("invalid email format"),
    password : z.string().min(6, "password must be at least 6 characters")
})