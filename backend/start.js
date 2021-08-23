require("dotenv").config();
require("./config/databaseConnect"); // runs databaseConnect
require("./seeders/randomFactSeeder");
const app = require("./app");
const port = 5000;

app.listen(port, () => {
  console.log(`Personal Space app listening at http://localhost:${port}`);
  console.log(`See documentation here: http://localhost:${port}/docs/`);
});
