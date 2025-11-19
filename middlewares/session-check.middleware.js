const getDbPromise = require("../db/connection");
const { eq } = require("drizzle-orm");
const { userSession } = require("../model/session.model");
const { userTable } = require("../model/user.model");

// ✅ UUID VALIDATION FUNCTION
function isValidUUID(uuid) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
}

exports.sessionCheckMiddleware = async (req, res, next) => {
    const db = await getDbPromise;
    const sessionId = req.headers["session-id"];

    if (!sessionId) {
        req.user = null;
        return next();
    }

    // 🔥 Validate UUID BEFORE running SQL 
    if (!isValidUUID(sessionId)) {
        return res.status(401).json({ error: "Invalid session format" });
    }

    const [session] = await db
        .select()
        .from(userSession)
        .where(eq(userSession.id, sessionId));

    if (!session) {
        return res.status(401).json({ error: "Invalid session" });
    }

    const [data] = await db
        .select()
        .from(userSession)
        .leftJoin(userTable, eq(userTable.id, userSession.userId))
        .where(eq(userSession.id, sessionId));

    req.user = data;
    next();
};







// const getDbPromise = require("../db/connection");
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

