import { vacayLength } from "./InputTesting/dateValidation";
import { persistance } from "./localStorage";
import { deleteTrip } from "./deleteTrip";


export const updateUI = (tripObj) => {
  //export const updateUI = (dataObj, userDate, userName, userCity, rtnDate) => {
  //recall that the appropriate number of days has already been added to the dataobj.neweatherdata from the server

  console.log(tripObj);
  let tripArray = localStorage.getItem("trips");

  const imgHolder = document.querySelector("#img-holder");
  let length = vacayLength(tripObj.userDate, tripObj.rtnDate);
  let outputName = document.getElementById("outputName");
  let tripInfo = document.getElementById("tripInfo");
  let outputWeather = document.getElementById("outputWeather");
  document.getElementById("save-trip").classList.toggle("hidden");


  document.getElementById("accordion-holder").innerHTML = "";
  outputName.innerHTML = "";
  tripInfo.innerHTML = "";
  outputWeather.innerHTML = "";
  document.getElementById("save-info").innerHTML = "";


  let preLoader = document.getElementById("pre-loader-holder");
  imgHolder.style.backgroundImage = `url(${tripObj.dataObj.fetchedData.pixURL})`;
  document.getElementById("text").innerHTML = "";
  preLoader.classList.remove("pre-loader");
  let formatDate;
  let formatRtn;
  for (let item in tripObj.dataObj.newWeatherEntry) {

    //--------------dynamically create images from images within a folder----------------------
    let myImg = require.context("../images/icons"); //require.context and then add in the folder that contains the images
    let weatherIcon = myImg(`./${tripObj.dataObj.newWeatherEntry[item].icon}.png`).default; //note the .default
    let newImg = document.createElement("img");
    newImg.src = weatherIcon;
    newImg.classList.add("icon-size");
    //-----------------------------------------------------------------------------------------

    //-----------------------------------Create collapsible button----------------------------
    let dayCount = new Date(`${tripObj.userDate} 00:00`);
    let rtn = new Date(`${tripObj.rtnDate} 00:00`);
    formatDate = (dayCount.getMonth() + 1) + '/' + dayCount.getDate() + '/' + dayCount.getFullYear();
    formatRtn = (rtn.getMonth() + 1) + '/' + rtn.getDate() + '/' + rtn.getFullYear();
    dayCount.setDate(parseInt(dayCount.getDate()) + parseInt(item));
    let newBtn = document.createElement("button"); //create a <button></button> tag
    // newP.id = item; //generate unique ids for each p tag
    newBtn.id = `btn${item}`;
    newBtn.classList.add("accordion");
    newBtn.innerHTML = `Weather for ${dayCount.getMonth() + 1}/${dayCount.getDate()}`;
    newBtn.appendChild(newImg);
    let newDiv = document.createElement("div");
    newDiv.classList.add("panel");
    //----------------------------------------------------------------------------------------

    for (let element in tripObj.dataObj.newWeatherEntry[item]) {
      let weatherElem = tripObj.dataObj.newWeatherEntry[item][element];
      if (element != "icon") {
        element = element[0].toUpperCase() + element.slice(1); //capitalize the first letter 
        let newP = document.createElement("p");
        let bolded = document.createElement("b"); //created a <b></b> tag 
        let textnode = document.createTextNode(element); //bold tags need a *textnode* specifically 
        bolded.appendChild(textnode);
        newP.appendChild(bolded);

        let weatherNode;

        if (element == "Snow" || element == "Rain") {
          weatherNode = document.createTextNode(`: ${weatherElem} mm`);
        } else if (element == "Temp") {
          weatherNode = document.createTextNode(`: ${weatherElem} F`);
        } else {
          weatherNode = document.createTextNode(`: ${weatherElem}`);
        }
        newP.appendChild(weatherNode);
        newDiv.appendChild(newP);
      }
      document.getElementById("accordion-holder").appendChild(newBtn); //Appending into the DOM 
      document.getElementById("accordion-holder").appendChild(newDiv); //Appending into the DOM 
    }
  }

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  }

  outputName.innerHTML = `Hi, ${tripObj.userName}`;
  tripInfo.innerHTML = `For your trip to ${tripObj.dataObj.fetchedData.city} starting on ${formatDate}, ending on ${formatRtn}, and lasting ${length} days:`;
  outputWeather.innerHTML = `Weather Data`;


  document.getElementById("save-trip").addEventListener("click", function () {
    persistance(tripObj);
  });

  if (tripArray) {
    for (let x = 0; x < JSON.parse(tripArray).length; x++) {
      document.getElementById("delete-trip").addEventListener("click", function () {
        deleteTrip(tripArray, x);
      })
    }
  } else {
    console.log("array is empty");
  }
}