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
  //console.log(cityJSON);
  res.send(cityJSON);
});

app.post("/getWeather", async (req, res) => {
  let lat = req.body.latitude;
  let lng = req.body.longitude;
  console.log(lat + lng);
  let currWeather = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.weather_API_KEY}&units=I`);
  let weatherData = {};
  let currWeatherJSON = await currWeather.json();
  let newEntry = {
    temp: currWeatherJSON.data[0].temp,
    snow: currWeatherJSON.data[0].snow,
    sunrise: currWeatherJSON.data[0].sunrise,
    sunset: currWeatherJSON.data[0].sunset,
    rain: currWeatherJSON.data[0].precip,
    descr: currWeatherJSON.data[0].weather.description
  }
  weatherData = newEntry; //adds new information to the weatherData object
  console.log(newEntry);
  res.send(weatherData);
});

app.post("/postCity", async (req, res) => { //based on pixabay documentation, the GET method should be used
  let city = encodeURI(req.body.postCity);
  console.log("Get pics " + city);
  
  let pixData = await fetch (`https://pixabay.com/api/?key=${process.env.pixabay_API_KEY}&q=${city}&image_type=photo&category=places&safesearch=true&order=popular&per_page=3`, { //safesearch, popular images, only 3 images returned
    method: "POST"
  });
  let pixDataJSON = await pixData.json();
  res.send(pixDataJSON);
});


