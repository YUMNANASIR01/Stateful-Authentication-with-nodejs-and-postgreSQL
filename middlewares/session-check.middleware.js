// middlewares\session-check.middleware.js
const { eq } = require("drizzle-orm");
const db = require("../db/connection")
const { userSession } = require("../model/session.model");
const { userTable } = require("../model/user.model");

exports.sessionCheckMiddleware = async (req, res, next)=>{
    // const sessionId req.header["session-id"]
    const sessionId = req.cookies.sessionId
    if(!sessionId){
        req.user = null // user data not available ❌
        return next()
    }
    // make a new table to show userTable, userSessions complete data
    const [data] = await db.select().from(userSession).where(eq(userSession.id, sessionId))
    .leftJoin(userTable, eq(userTable.id, userSession.userId))

    if(!data){
        res.clearCookie("sessionId")
        res.status(401).json({error: "invalid session Id in cookie"})
    }
    // session id expiration checking or (clear bhi kar raha hai data jab apki session id expire hai)
    // expiration code jab 7 din puray ho jain us ky bad 8 day pe seesion id expire hojai gyi or also session bhi expire hojai gya
//current time zida hai   current time st
    if(new Date() > new Date(data.user_session.expireAt)){ //starting data hai jab hamari cookie bani tab ki date hai
      res.clearCookie("sessionId")
      return res.status(401).json({error: "session expired, Please login again."})
    }
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
