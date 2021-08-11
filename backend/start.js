require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");


// connect to mongoDB
mongoose.connect(`${process.env.MONGO_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // recommended in connection
  useCreateIndex: true, // only in devdelopment
})
.catch((err) => {
  console.log("connection error:", err);
}); // handle initial connection errors;

const db = mongoose.connection;

// handle errors after initial connection
db.on("error", (err) => {
  console.log("connection error:", err);
});
db.once("open", () => {
  console.log("db connected!");
});

app.listen(process.env.PORT, () => {
  console.log(`Personal Space app listening at http://localhost:${process.env.PORT}`);
});
