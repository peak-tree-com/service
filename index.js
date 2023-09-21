const express = require("express");

require("dotenv").config();

const Router = require("./src/routes/auth.route");
const app = express();
const dbConfig = require("./src/configs/db.config.js");

app.use(express.json());
app.use(Router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Successfully Connected to the port http://localhost:${port}`);
});
