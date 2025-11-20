// middlewares\session-check.middleware.js
const { eq } = require("drizzle-orm");
const db = require("../db/connection")
const { userSession } = require("../model/session.model");
const { userTable } = require("../model/user.model");

exports.sessionCheckMiddleware = async (req, res, next)=>{
    const sessionId = req.headers["session-id"]
    if(!sessionId){
        req.user = null // user data not available ❌
        return next()
    }

    // First get the sessionId from database
    const [session] = await db.select().from(userSession).where(eq(userSession.id, sessionId))
    if(!session){
        return res.status(401).json({error: "invalid session"})
    }

    // make a new table to show userTable, userSessions complete data
    const [data] = await db.select().from(userSession).where(eq(userSession.id, sessionId))
    .leftJoin(userTable, eq(userTable.id, userSession.userId))

    req.user = data // user data is available ✅
    next()
}










// const { eq, sql } = require("drizzle-orm");
// const { userSession } = require("../model/session.model");
// const { userTable } = require("../model/user.model");

// exports.sessionCheckMiddleware = async (req, res, next) => {
//     const db = await getDbPromise; // Await the promise to get the db object
//     const sessionId = req.headers["session-id"];

//     if (!sessionId) {
//         req.user = null; // user data no persesnt (available)
//         return next();
//     }
     
//     // first get the session ID from database
//     //                     db mai ja ky tammam chhezan ly ky ao is table mai
//             const [session] = await db.select().from(userSession).where(eq(userSession.id, sql`${sessionId}::uuid`));;
    
//     if (!session) {
//         return res.status(401).json({ error: " Invalid session " });
//     }

//     //  make a new table to show user table, userSession complete data
//     const [data] = await db.select().from(userSession).where(eq(userSession.id, sessionId)).leftJoin(userTable, eq(userTable.id, userSession.userId));
//     //  yah to user data avaliable hai yah to nahi hai
//     req.user = data;    // ok user data
//     next();
// };
