// title: app.js
// author: ngi bujri
// date: march 17 2023

// modules
const express = require("express");
const http = require("http");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

const app = express();

// set port number
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTFul APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

// create http server
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port ${port}`);
});
