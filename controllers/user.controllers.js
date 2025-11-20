// controllers\user.controllers.js
const db= require("../db/connection")
const {userTable} = require ("../model/user.model")
const {userSession} = require ("../model/session.model")
const {eq} = require("drizzle-orm")
const {randomBytes, createHmac} = require('node:crypto');



exports.signupFunction =  async (req,res)=>{
    const {username,email, password} = req.body

    const {existingUser} = await db.select().from(userTable).where(eq(userTable.email))
//  ------ user validation 
    if(existingUser){
        return res.status(400).json({error : `user with email ${email} already exist`})
    }
    
    //  create a salt , salt is a random string
     const salt = randomBytes(256).toString("hex")
     console.log("😒salt", salt);
     
    
    //  password + salt
    // convert into algorithms
    const hashPassword = createHmac('sha256', salt ).update( password ).digest('hex');
    console.log("❤️ hashPassword", hashPassword);           
    
    // save in to data base
    const result = await db.insert(userTable).values({
        username : username,
        email : email,
        salt : salt,
        password : hashPassword
    }).returning({id : userTable.id})

    return res.status(200).json({status: "Account created", data: result})
}


// ---------------------------------------------------------------------

exports.loginFunction = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const existingUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

    if (existingUser.length === 0) {
        return res.status(400).json({
            error: `User with this email ${email} does not exist`
        });
    }

    // extract user
    const user = existingUser[0];

    // get salt from db
    const dbsalt = user.salt;   

    // hash password
    const newHashedPassword = createHmac("sha256", dbsalt).update(password).digest("hex");

    // compare hashed passwords
    if (newHashedPassword !== user.password) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    const [session] = await db.insert(userSession).values({
        userId: user.id 
    }).returning({id: userSession.id})
   

     return res.json({ status: "Welcome to website", sessionId : session.id });
};

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