const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: req.body.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/login",
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();

  const decoded = jwt.decode(data.id_token);

  if (!decoded) {
    return res.status(400).json({message: "Invalid code"});
  }

  //console.log(decoded);
  // destructuring with renaming: sub: google_id
  const { sub: google_id, given_name, family_name, email, picture } = decoded;

  const filter = { google_id };
  const update = { google_id, given_name, family_name, picture, email, is_admin
    : email === process.env.ADMIN ? true : false };
  const user = await User.findOneAndUpdate(filter, update, {
    setDefaultsOnInsert: true,
    new: true, // return the new data
    upsert: true, // Make this update into an upsert
  });

  const token = jwt.sign({ google_id, picture, given_name, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '3600s' }); // { expiresIn: '30s' } // creates jwt signed with mySecret, with payload in {}, user can't use other user access rights

  res.json({ token, apiStatuses: user.apis, username: user.username }); //between {}, token it becomes a key: value pair: token: token
};

exports.checkLoggedIn = async (req, res) => {
  const user = await User.findOne({ google_id: res.locals.google_id });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ apiStatuses: user.apis, username: user.username });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({}).select("given_name username picture");
  if (!users.length) return res.status(404).json({ message: "Users not found" });
  return res.json(users);
};

exports.apiStatusToggle = async (req, res) => {
  const { api, status } = req.body;

  const filter = { google_id: res.locals.google_id };
  // template string as object key should be in []
  const update = { [`apis.${api}`]: status };

  const existingStatus = await User.findOneAndUpdate(filter, update);
  if (!existingStatus) return res.status(404).json({ message: "User not found" });

  res.json({ message: "Api status updated" });
};

exports.setUsername = async (req, res) => {
  const { username } = req.body;

  if (!/^[A-Za-z0-9]{1,50}$/.test(username)) return res.status(406).json({ message: "Not acceptable, numbers and English letters only" });

  const existingUsername = await User.findOne({ username });
  if (existingUsername) return res.status(400).json({ message: "Username already taken" });

  const filter = { google_id: res.locals.google_id };
  const update = { username };

  const user = await User.findOneAndUpdate(filter, update, {
    new: true, // return the new data
    });

  if (!user) return res.status(404).json({ message: "User not found" });

  const newUsername = user.username;

  res.json({ newUsername, message: "Username updated" });
};

exports.deleteAccount = async (req, res) => {
  const user = await User.findOneAndDelete({ google_id: res.locals.google_id });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: `${user.given_name}'s account has been deleted.` });
};

exports.deleteAccountById = async (req, res) => {
  const { id } = req.params;
  if(!res.locals.is_admin) {
    return res.status(401).json({message: "Unauthorized"});
  }
  const user = await User.findOneAndDelete({ google_id: id });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: `${user.given_name}'s account has been deleted.` });
};
