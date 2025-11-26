// db/connection.js
// .env file ko load karne ke liye
require('dotenv').config();

const { drizzle } = require("drizzle-orm/node-postgres");
// ------ Pool use for asynchronous connections ---------
const { Pool } = require('pg');// 'pg' library se Client import karein
// --------------------------------------------------
// const { Client } = require('pg'); // 'pg' library se Client import karein

// Ek naya client banayein //ab client ki jagah pool use kar rahe hain\
// bhooat sary client ky liya new pool banaya hai
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // .env file se URL read kar rahe hain
});
// // Database se connect karein
// // Note: Production apps mein 'Pool' use karna behtar hai, but yeh simple setup hai
// client.connect(); 

// Drizzle ko 'pg' Pool ke saath initialize karein
const db = drizzle(pool);

// 'db' object ko export karein taaki doosri files use kar sakein
module.exports = db;