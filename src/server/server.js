const path = require('path');
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");  //Allows us to use fetch server-side 

require("dotenv").config(); //Allows us to incorporate information from the .env file -> see .env file. 
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

app.post("/fetchData", async (req, res) => { //see corresponding fetchData POST on main.js
  let city = req.body.userDest; //gets the destination city from the parameter that contains the city
  let interval = req.body.interval;
  const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`; //obtained from the Geo API documentation

  try {
    let geoData = await fetch(geoURL);
    let geoDataJSON = await geoData.json();

    let newGeoData = {
      state: geoDataJSON.geonames[0].adminName1, //Will also provide international locations
      countryName: geoDataJSON.geonames[0].countryName,
      countryCode: geoDataJSON.geonames[0].countryCode,
      lat: geoDataJSON.geonames[0].lat,
      lng: geoDataJSON.geonames[0].lng,
      city: geoDataJSON.geonames[0].name
    }
    fetchedData = {...fetchedData, ...newGeoData}; //using spread method to add the key value pairs to the fetchedData object
    } catch (error) {
      console.log("error", error);
    }

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weatherKEY}&units=I`; //use the lat/lng from above geocities in this api call
    let weatherData = await fetch (weatherURL);
    let weatherDataJSON = await weatherData.json();
    console.log(JSON.stringify(weatherDataJSON));
    let newWeatherEntry = {};

    try {
      for (let i = 0; i < interval; i++) {
        newWeatherEntry[i] = {
          snow: weatherDataJSON.data[i].snow,
          rain: weatherDataJSON.data[i].precip,
          general: weatherDataJSON.data[i].weather.description,
          icon: weatherDataJSON.data[i].weather.icon,
          temp: weatherDataJSON.data[i].temp
        }
      }
  } catch (error) {
    console.log("error", error);
  }

  try {
    let pixabayURL = `https://pixabay.com/api/?key=${pixabayKEY}&q=${fetchedData.city}&image_type=photo&safesearch=true&order=popular&per_page=3`;
    let imageData = await fetch(pixabayURL);
    let pixabayJSON = await imageData.json();

    if (pixabayJSON.total == 0) {  //if there are no images based on the city, get image from the country
      pixabayURL = `https://pixabay.com/api/?key=${pixabayKEY}&q=${fetchedData.countryName}&image_type=photo&safesearch=true&category=places&order=popular&per_page=3`;
      imageData = await fetch(pixabayURL);
      pixabayJSON = await imageData.json();
      if (pixabayJSON.total == 0) { //if there is no image from the country either, send image of a compass
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
  console.log(`this is the data I will send: ${JSON.stringify(fetchedData, newWeatherEntry)}`);
  res.send({fetchedData, newWeatherEntry});
}); //go back to main.js postdata function to dataobj