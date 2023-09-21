const express = require("express");
const Router = require("./src/routes/Auth.js");
const app = express();
const dbConfig = require("./src/configs/db.config.js")

app.use(express.json());
app.use(Router);

const port = 3000;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

app.listen(port,()=>{
    console.log(`Successfully Connected to the port ${port}`)
})

