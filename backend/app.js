const express = require("express");
require('express-async-errors');
const app = express();
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const testGetController = require('./controllers/testController');

// USE CORS FOR BUILD
// const cors = require('cors');

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// express json middleware
app.use(express.json())

app.get("/api/test", testGetController.testGet)


app.post("/api/login", async (req, res) => {

  const response = await  fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: req.body.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/login",
      grant_type: "authorization_code"
    }),
  })

  const data = await response.json()
  
  const decoded = jwt.decode(data.id_token);

  if (!decoded) {
    return res.status(400).json("Invalid code")
  }

  console.log(decoded);
  // destructuring with renaming: sub: google_id
  const { sub: google_id, given_name, family_name, email, picture } = decoded;

  const filter = { google_id };
  const update = { google_id, given_name, family_name, picture, email };
  const user = await User.findOneAndUpdate(filter, update, {
    setDefaultsOnInsert: true,
    new: true, // return the new data, but now we don't store it in a variable
    upsert: true // Make this update into an upsert
  });
    
  const token = jwt.sign({ google_id, picture, given_name, apiStatuses: user.apis }, process.env.JWT_SECRET); // creates jwt signed with mySecret, with payload in {}, user can't use other user access rights
  
  // token is a string, now make it into an object {token: token}
  res.json({ token }); //between {}, token it becomes a key: value pair: token: token
  
})

app.post("/api/toggle-status", async (req, res) => {

  const { api, status } = req.body;

  const token = req.headers.authorization;
  console.log("token", token);
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json("Unauthorized")
  }
 
  console.log("verified token", verifiedToken);

  const filter = { google_id: verifiedToken.google_id };
  // template string as object key should be in []
  const update = { [`apis.${api}`]: status };

  const existingStatus = await User.findOneAndUpdate(filter, update);

  res.json({ message: "api status updated" }); 
})

// catch 404 and forward to error handler
app.use(notFoundHandler);

app.use(errorHandler);


module.exports = app;
