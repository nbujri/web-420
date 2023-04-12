// title: app.js
// author: ngi bujri
// date: march 17 2023

// modules
const express = require("express");
const http = require("http");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerRouter = require("./routes/bujri-composer-routes");

const app = express();

// connection string for mongoDB
const conn =
  "mongodb+srv://web420_user:s3cret@bellevueuniversity.hyveuqd.mongodb.net/web420DB";

// connect to web420DB
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

// set port number
app.set("port", process.env.PORT || 3000);

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
app.use("/api", composerRouter);

// create http server
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
