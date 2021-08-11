const mongoose = require("mongoose");

// connect to mongoDB
mongoose
  .connect(`${process.env.MONGO_LINK}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // recommended in connection
    useCreateIndex: true, // only in development
  })
  .catch((err) => {
    console.error("Connection error at initial connection:", err); // log in red
    // no more connection attempts after error
    process.exit(1);
  }); // handle initial connection errors;

const db = mongoose.connection;

// handle errors after initial connection
db.on("error", (err) => {
  console.error("Connection error:", err); // log in red
});
db.once("open", () => {
  console.log("Database connected!");
});
