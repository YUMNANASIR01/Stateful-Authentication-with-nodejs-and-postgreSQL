// controllers\user.controllers.js
const db= require("../db/connection")
const {userTable} = require ("../model/user.model")
const {userSession} = require ("../model/session.model")
const {eq} = require("drizzle-orm")
const bcrypt = require('bcrypt');
const { GelSession } = require("drizzle-orm/gel-core");


// --------------------- sign up -------------------------
exports.signupFunction =  async (req,res)=>{
    const {username,email, password} = req.body

    const {existingUser} = await db.select().from(userTable).where(eq(userTable.email))
//  ------ user validation 
    if(existingUser){
        return res.status(400).json({error : `user with email ${email} already exist`})
    }
    
    //  hashing
    //                  "n number of salt"
    const hashPassword = await bcrypt.hash(password, 10)
    
    // save in to data base
    const result = await db.insert(userTable).values({
        username : username,
        email : email,
        password : hashPassword
    }).returning({id : userTable.id})

    return res.status(200).json({status: "Account created", data: result})
}

// ----------------------- login ---------------------------
exports.loginFunction = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const [existingUser] = await db.select().from(userTable).where(eq(userTable.email, email));
    if (!existingUser) {
        return res.status(400).json({error: `User with this email ${email} does not exist`});
    }
    // Check password                         user given password    hash database save password
    // Validate password
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    // Create expiration date
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 7); // 7 days later //update date and time

    // Create session
    const [session] = await db.insert(userSession)
        .values({ userId: existingUser.id, expireAt: expireAt })
        .returning({ id: userSession.id });

    // Set sessionId cookie
    res.cookie("sessionId", session.id, {
        httpOnly: true,
        secure: false, //frontend sy anany wale request ko rok deta hai true kary sy
        sameSite: "lax", //for development
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days setting cookies for 7 days
    });
    // data: session  ab hamin session id dekhny ki need nahi hai kun ky data ab hamara cookies mai session id mai save horaha hai
    return res.json({ status: "Welcome to the website" });
};

// ------------------------------------- Home ----------------------------------
exports.homeFunction = async (req,res) => {
    //  Is user login(sesion id check) logic checking
    //  If does user have data in request.user
    const userData = req.user
     if (!userData){
         return res.status(401).json({error : " You are not login, Please First login"})
     }
     return res.status(200).json({status : "Here is your data", data: userData})

    //    user login hai yah nahi hai (1.login) (2. check fetch and check)
    //  user information from user table 
}





 // }).returning({id: userSession.id, userId: userSession.userId, createdAt: userSession.createdAt}); // Corrected: returning clause