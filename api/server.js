const express = require("express");
const helmet = require("helmet");

//routers

const lessonsRouter = require("../lessons/lessonsRouter");

const server = express();

server.use(express.json());

server.use(helmet());

//router use
server.use("/api/lessons", lessonsRouter);

server.get("/", (req, res) => {
  res.send("server is running");
});

module.exports = server;
