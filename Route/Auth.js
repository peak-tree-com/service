const express = require('express');
const User = require('../Model/UserModel');

const bcryptjs = require("bcryptjs");
const AuthRoute = express.Router();

AuthRoute.post('/Peak-tree/UserSignUp',async (req,res)=>{
    try {
        const { name, email, password,username } = req.body;
    
        const existingUser = await User.findOne({ email });
        const existingUserid = await User.findOne({ username });
        if (existingUser||existingUserid) {
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        }
    
        const hashedPassword = await bcryptjs.hash(password, 8);
    
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

AuthRoute.get("/Peak-tree/UserSignIn", async(req,res)=>{
    
})

module.exports = AuthRoute;