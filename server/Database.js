const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/blog";

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connect to mongo is successfull.");
  } catch (err) {
    console.log("Connection Unsuccessfull.", err);
  }
};
module.exports = ConnectToMongo;
