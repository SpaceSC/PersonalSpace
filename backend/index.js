require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');

// USE CORS FOR BUILD
// const cors = require('cors');

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// express json middleware
app.use(express.json())

// mongoose
const mongoose = require("mongoose");

// connect to mongoDB
mongoose.connect(`${process.env.MONGO_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // recommended in connection
  //useCreateIndex: true, // only in devdelopment
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});


app.listen(process.env.PORT, () => {
  console.log(`Personal Space app listening at http://localhost:${process.env.PORT}`);
});




