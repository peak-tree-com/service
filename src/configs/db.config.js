const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(MONGODB_URL)
      .then(() => {
        console.log("Database connection successful!");
      })
      .catch((err) => {
        console.error("database connection failed! \n ", err);
      });
  }
}

module.exports = new Database();
