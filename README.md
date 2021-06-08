# Travel App
This project utilizes **JavaScript**, **HTML**, **Sass** to provide weather data for upcoming trips. 

Enter your name, destination city/state/country, departure and return dates. The app will calculate your trip length and provide a weather forecast. The number of days in the weather forecast depends upon when you are leaving for your trip. Trip information can also be saved, retrieved, updated, and deleted.

## Version 1.0

## APIs used in this project 
- GeoNames 
- Weatherbit
- Pixabay

## Dependencies
- Cors 2.8.5
- Dotenv 9.0.2
- Express 4.17.1
- Node-Fetch 2.6.1
- Node-Sass 6.0.0
- Webpack-cli 4.7.0

## Extras 
- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities). 
- Allow the user to remove the trip.
- Use Local Storage to save the data. 
- Pull the forecast for multiple days.
- Incorporate icons into forecast. 
- Allow the user to add additional trips. 

## Instructions to run app 
- Obtain API keys from the above sites 
- Create a `.env` file in the root directory 
- Copy the following lines of code into the `.env` file and input your API keys where prompted

<pre>
geo_API_KEY = Your geoNames api key here
weather_API_KEY = Your weatherBit api key here
pixabay_API_KEY = Your pixabay api key here
</pre>


## To start production mode  
    npm run prod

## To start the server 
    npm run start

## To start development mode  
    npm run dev

## Jest testing 
    npm jest

## Copyright
_FreudCat 2021_