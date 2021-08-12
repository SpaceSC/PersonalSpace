const express = require("express");
require("express-async-errors");
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

// USE CORS FOR BUILD
// const cors = require('cors');

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// express json middleware
app.use(express.json());

app.use("/api", apiRoutes);

// catch 404 and forward to error handler
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
