require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');
// const cors = require('cors');

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));