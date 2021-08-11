require("dotenv").config();
require("./config/databaseConnect"); // runs databaseConnect
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Personal Space app listening at http://localhost:${process.env.PORT}`);
});
