const path = require('path');
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express(); //start instance of express app
const port = 2000; 

app.use(cors());

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("dist"));  //entry point for app
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"))
  }); //resolves the path to the html file to render into browser

app.listen(port, () => {
  console.log(`Listening on port ${port}`);;
});

app.post("/fetchCoords", async (req,res) => {
  let getCity = req.body.destination; 
  let city = await fetch(`http://api.geonames.org/searchJSON?q=${getCity}&maxRows=1&username=${process.env.geo_username}`);
  
  let cityJSON = await city.json();
  console.log(cityJSON);
  res.send(cityJSON);
});

app.post("/getWeather", async (req, res) => {
  let lat = req.body.latitude;
  let lng = req.body.longitude;
  console.log(lat + lng);
})


