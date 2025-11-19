const express = require("express")

const app = express()
const PORT = 8000
// ------------------ Data base----------------
const userDb = {}
const EMAILS = new Set()
                //  har cheez unique hoti hai
// ------------------------------ middle ware --------------
app.use(express.json());
// ------------------------
// login route --------------
app.post("/login", (req,res)=>{
    const {token} = req.body

    const tokenCheck = userDb[token] 
    if (!tokenCheck){
         res.status(400).json({status : "you do not have an account, Please signup first at'/signup' " })  
    }
    res.status(200).json({status : "You Have Login successfully", data : tokenCheck })
    
})
// ------------------------ sign up route ---------------
app.post('/signup', (req, res)=> {
    const {username , password , email} = req.body

    if(EMAILS.has(email)){
        res.status(400).json({status : "Email Already Taken" }) 
    }
    //-- create a token for user
    const token = `${Date.now()}`
    // ---------- user db mai data store kar rahy hain 
    // ----- token number ky behalve mai data store kia hai
    userDb[token] = {username , password , email} 
    EMAILS.add(email)

    res.status(201).json({status : "You Have successfully Sign-Up", token : token})
})

app.listen(PORT, ()=>{
    console.log("server is running on 8000 port");
    
})