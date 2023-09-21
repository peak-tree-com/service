const express = require('express');

const User = require('../models/UserModel');

const auth = require("../../Middleware/auth.js");

const jsw = require("jsonwebtoken");

const sha = require('crypto')

const AuthRoute = express.Router();

AuthRoute.post('/Peak-tree/UserSignUp',async (req,res)=>{
    try {
        const { name, email, password,username } = req.body;
    
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        }

        if (!name || !username || !email|| !password) {
            res.status(404).send(
            "All field are manditory",
            );
        }
        hashedPassword = sha.createHash("sha512").update(password).digest("hex")
    
        let user = new User({
            username,
            email,
            password: hashedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


AuthRoute.post('/Peak-tree/UserSignIn',async (req,res)=>{
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            res.status(404).send("Student Doesn\'t Exist")
        }

        const ismatch = sha.createHash("sha512").update(password).digest('hex');

        if (ismatch !== user.password) {
            return res.status(400).json("Password is incorrect" );
        }

        const token = jsw.sign({id:user._id},'passwordKey')
        res.json({token,...user._doc})
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
});

AuthRoute.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);
        
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
    
  // get user data
    AuthRoute.get("/", auth, async (req, res) => {
        const user = await User.findById(req.user);
        res.json({ ...user._doc, token: req.token });
    });
    
module.exports = AuthRoute;