// --------------------- hashing logarithm  ----------------------------
// ----------------------- session id in statefull ---------------------------
// index.js
const express = require('express');
const userRouter = require("./routes/user.routes") 
const cookieParser = require('cookie-parser');
// ----------------- helmet for security ----------------------
const helmet = require("helmet");
// --------------------- cors ------------------------------
const cors = require('cors')

const app = express();
// ----------------------------------------------------
app.use(express.json())
// -------------------------------------
// ------------- cors ----------------------
app.use(cors({
    origin: ['http://localhost:0000'], // allow to server to accept request from different origin
    credentials: true,// allow session cookie from browser to pass through or allow the cokies to send
}))

// ---------------------------------
app.use(cookieParser());
// ---------------------------------
// ------------- helmet for security ddos attack ky lia ----------------------
// ------- jab frontend banain gyi to true karain gyin
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy : false,
}));

// ------------- user router ----------------------
app.use("/user", userRouter)

// ----------------------------------------------
const PORT = 8000;
app.listen(PORT, ()=>{ console.log("server is running on 8000 port")})