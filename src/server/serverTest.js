//This file is just to test express endpoints. Notice that we are not using app.listen since we just want to test the service, not listen. 
const express = require("express");
const app = express(); 

app.get("/", function (req, res) {
  res.status(200).send("Test has passed!");
});
module.exports = app; //export the app, see serverTest.spec.js