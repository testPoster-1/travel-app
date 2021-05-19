const path = require('path');
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();
const geoUsername = process.env.geo_username;
const weatherKEY = process.env.weather_API_KEY;
const pixabayKEY = process.env.pixabay_API_KEY;

const app = express(); //start instance of express app
const port = 2000; 

app.use(cors());

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let fetchedData = {};

app.use(express.static("dist"));  //entry point for app
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"))
  }); //resolves the path to the html file to render into browser

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/fetchData", async (req, res) => {
  let city = req.body.userDest; //gets the destination city from the user.
  let interval = req.body.interval;
  console.log("this is my city " + city);
  const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`; //obtained from the Geo API documentation

  try {
    let geoData = await fetch(geoURL);
    //console.log(JSON.stringify(geoData));
    let geoDataJSON = await geoData.json();
    //console.log(JSON.stringify(geoDataJSON));

    let newGeoData = {
      state: geoDataJSON.geonames[0].adminName1, //Will also provide international locations
      countryName: geoDataJSON.geonames[0].countryName,
      countryCode: geoDataJSON.geonames[0].countryCode,
      lat: geoDataJSON.geonames[0].lat,
      lng: geoDataJSON.geonames[0].lng,
      city: geoDataJSON.geonames[0].name
    }
    fetchedData = {...fetchedData, ...newGeoData}; //using spread method to add the key value pairs to the fetchedData object
    //console.log(fetchedGeoData);
//    res.send(geoDataJSON);
    } catch (error) {
      console.log("error", error);
    }

    if (interval == 1) {
    try {
    let weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weatherKEY}&units=I`;
    let weatherData = await fetch (weatherURL);
    let weatherDataJSON = await weatherData.json();

    let newWeatherEntry = {
      sunrise: weatherDataJSON.data[0].sunrise,
      sunset: weatherDataJSON.data[0].sunset,
      snow: weatherDataJSON.data[0].snow,
      rain: weatherDataJSON.data[0].precip,
      general: weatherDataJSON.data[0].weather.description,
      temp: weatherDataJSON.data[0].temp      
    }

    fetchedData = {...fetchedData, ...newWeatherEntry};
  
  } catch (error) {
    console.log("error", error);
  }
} else {
  try {  
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weatherKEY}&units=I`;
    let weatherData = await fetch (weatherURL);
    let weatherDataJSON = await weatherData.json();
    console.log(`more than 1 week: ${JSON.stringify(weatherDataJSON)}`);

    let newWeatherEntry = {
      data: weatherDataJSON.data    
    }

    fetchedData = {...fetchedData, ...newWeatherEntry};
  
  } catch (error) {
    console.log("error", error);
  }
}

  try {
    let pixabayURL = `https://pixabay.com/api/?key=${pixabayKEY}&q=${fetchedData.city}&image_type=photo&safesearch=true&order=popular&per_page=3`;
    let imageData = await fetch(pixabayURL);
    let pixabayJSON = await imageData.json();

    if (pixabayJSON.total == 0) {
      pixabayURL = `https://pixabay.com/api/?key=${pixabayKEY}&q=${fetchedData.countryName}&image_type=photo&safesearch=true&category=places&order=popular&per_page=3`;
      imageData = await fetch(pixabayURL);
      pixabayJSON = await imageData.json();
      if (pixabayJSON.total == 0) {
        newImgData = {
          pixURL: "https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_1280.jpg"
        }
      }
    } else {    
    newImgData = {
      pixURL: pixabayJSON.hits[0].webformatURL
    }
  }
  newImgData = {
    pixURL: pixabayJSON.hits[0].webformatURL
  }

    fetchedData = {...fetchedData, ...newImgData};
    console.log(`Special fetched data ${JSON.stringify(fetchedData)}`);
  } catch (error) {
    console.log("error", error);
  }
  console.log(`this is the data I will send: ${JSON.stringify(fetchedData)}`);
  res.send(fetchedData);
});