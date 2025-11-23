// --------------------- hahing logarithm  ----------------------------
// ----------------------- session id in statefull ---------------------------
// index.js
const express = require('express');
const userRouter = require("./routes/user.routes") 
const cookieParser = require('cookie-parser');

const app = express();
// ----------------------------------------------------
app.use(express.json())
// -------------------------------------
app.use(cookieParser());
// ---------------------------------
app.use("/user", userRouter)

// ----------------------------------------------
const PORT = 8000;
app.listen(PORT, ()=>{ console.log("server is running on 8000 port")})