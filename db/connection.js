// db/connection.js

// db/connection.js

// .env file ko load karne ke liye
require('dotenv').config();

const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require('pg'); // 'pg' library se Client import karein

// Ek naya client banayein
const client = new Client({
  connectionString: process.env.DATABASE_URL, // .env file se URL read kar rahe hain
});

// Database se connect karein
// Note: Production apps mein 'Pool' use karna behtar hai, but yeh simple setup hai
client.connect(); 

// Drizzle ko 'pg' client ke saath initialize karein
const db = drizzle(client);

// 'db' object ko export karein taaki doosri files use kar sakein
module.exports = db;