// db/connection.js

// .env file ko load karne ke liye
require('dotenv').config();

const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require('pg'); // 'pg' library se Client import karein

let dbPromise; // This will store the promise of the db object

async function initializeDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      // Ek naya client banayein
      const client = new Client({
        connectionString: process.env.DATABASE_URL, // .env file se URL read kar rahe hain
      });

      // Database se connect karein
      await client.connect(); 

      // Drizzle ko 'pg' client ke saath initialize karein
      return drizzle(client);
    })();
  }
  return dbPromise;
}

// Export a function that returns the promise of the db object
module.exports = initializeDb();