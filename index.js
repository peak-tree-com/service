const express = require("express");

const mongoose = require('mongoose');

const AuthRoute = require("./Route/Auth.js");

const DB ='mongodb+srv://Peak-Tree-com:PeakTree1234!@cluster0.rh6mn0a.mongodb.net/';

const app = express();
app.use(express.json());
app.use(AuthRoute);

mongoose.connect(DB).then(()=>{
    console.log("Database Connected Successfully");
}).catch((error)=>{
    console.log(`Failed to Connect${error}`);
})

const port = 3000;

app.listen(port,()=>{
    console.log(`Successfully Connected to the port ${port}`)
})

