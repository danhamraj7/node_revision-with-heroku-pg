require("dotenv").config(); // reads values from .env file and merges them into process.env

const server = require("./api/server.js");

// make the port dynamic, so heroku can assign one
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
