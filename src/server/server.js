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
  let city = req.body.destination; //gets the destination city from the user.
  let interval = req.body.interval;
  const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`; //obtained from the Geo API documentation

  try {
    let geoData = await fetch(geoURL);
    //console.log(JSON.stringify(geoData));
    let geoDataJSON = await geoData.json();
    //console.log(JSON.stringify(geoDataJSON));
    console.log(geoDataJSON);
    console.log(interval);

    let newGeoData = {
      countryCode: geoDataJSON.geonames[0].countryCode,
      countryName: geoDataJSON.geonames[0].countryName,
      city: geoDataJSON.geonames[0].name,
      lat: geoDataJSON.geonames[0].lat,
      lng: geoDataJSON.geonames[0].lng, 
      state: geoDataJSON.geonames[0].adminName1 //Will also provide international locations
    }
    fetchedData = {...fetchedData, ...newGeoData}; //using spread method to add the key value pairs to the fetchedData object
    //console.log(fetchedGeoData);
//    res.send(geoDataJSON);
    } catch (error) {
      console.log("error", error);
    }

    try {
    let weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weatherKEY}&units=I`;
    let weatherData = await fetch (weatherURL);
    let weatherDataJSON = await weatherData.json();
    //console.log(JSON.stringify(weatherDataJSON));

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

  try {
    let pixabayURL = `https://pixabay.com/api/?key=${pixabayKEY}&q=${fetchedData.city}&image_type=photo&category=places&safesearch=true&order=popular&per_page=3`;
    let imageData = await fetch(pixabayURL);
    let pixabayJSON = await imageData.json();
   // console.log(JSON.stringify(pixabayJSON));

    let newImgData = {
      pixURL: pixabayJSON.hits[0].webformatURL
    }

    fetchedData = {...fetchedData, ...newImgData};
    console.log(`Special fetched data ${JSON.stringify(fetchedData)}`);
  } catch (error) {
    console.log("error", error);
  }

  res.send(fetchedData);
});

// "webformatURL":"https://pixabay.com/get/g44e8e0c18e7635df090fc2f2d7216573a9c1f4a4d9836911388180bae9e77cb9d7c43df40eef4f9aab47f9f5756a90faea66e4e5d92054a93d61cc06d5a7c91b_640.jpg",

// {"data":[{"rh":62,"pod":"d","lon":-87.65,"pres":999.2,"timezone":"America/Chicago","ob_time":"2021-05-15 23:45","country_code":"US","clouds":100,"ts":1621122300,"solar_rad":25.8,"state_code":"IL","city_name":"Chicago","wind_spd":4.6,"wind_cdir_full":"south-southeast","wind_cdir":"SSE","slp":1021.8,"vis":3.1,"h_angle":56.3,"sunset":"01:04","dni":474.12,"dewpt":45.9,"snow":0,"uv":0.912664,"precip":0,"wind_dir":162,"sunrise":"10:28","ghi":128.8,"dhi":52.41,"aqi":38,"lat":41.85,"weather":{"icon":"c04d","code":804,"description":"Overcast clouds"},"datetime":"2021-05-15:23","temp":59,"station":"E3114","elev_angle":10.27,"app_temp":58.9}],"count":1}

// app.post("/fetchCoords", async (req,res) => {
//   let getCity = req.body.destination; 
//   let city = await fetch(`http://api.geonames.org/searchJSON?q=${getCity}&maxRows=1&username=${process.env.geo_username}`);
  
//   let cityJSON = await city.json();
//   //console.log(cityJSON);
//   res.send(cityJSON);
// });

// app.post("/getWeather", async (req, res) => {
//   let lat = req.body.latitude;
//   let lng = req.body.longitude;
//   console.log(lat + lng);
//   let currWeather = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.weather_API_KEY}&units=I`);
//   let currWeatherJSON = await currWeather.json();
//   console.log(currWeatherJSON);
//   // let newEntry = {
//   //   city_name: currWeatherJSON.data[0].city_name,
//   //   temp: currWeatherJSON.data[0].temp,
//   //   snow: currWeatherJSON.data[0].snow,
//   //   sunrise: currWeatherJSON.data[0].sunrise,
//   //   sunset: currWeatherJSON.data[0].sunset,
//   //   rain: currWeatherJSON.data[0].precip,
//   //   descr: currWeatherJSON.data[0].weather.description
//   // }
//   // fetchedData = {...fetchedData, ...newEntry} //Using a spread to merge object. Express will wipe data when going from prod to dev if you just do a simple assignment, so use this spread (or Object.assign) instead.
//   console.log(`new entry: ${JSON.stringify(fetchedData)}`);
// });

// // app.post("/postCity", async (req, res) => { //based on pixabay documentation, the GET method should be used
// //   console.log("Get pics post"); 
// //   cityObj = {
// //     city: req.body.data
// //   }
// //   console.log(`My city obj: ${JSON.stringify(cityObj)}`);
// // });

// app.get("/getImages", async (req, res ) => {
//   console.log(`This is my fetched city: ${JSON.stringify(fetchedData)}`);
//   let pixData = await fetch (`https://pixabay.com/api/?key=${process.env.pixabay_API_KEY}&q=${fetchedData.city_name}&image_type=photo&category=places&safesearch=true&order=popular&per_page=3`); //safesearch, popular images, only 3 images returned
//   let pixDatajson = await pixData.json();
//   console.log("Pixdatajson: " + JSON.stringify(pixDatajson));
//   res.send(pixDatajson);
// });

