import { vacayLength } from "./InputTesting/dateValidation";
import { persistance } from "./localStorage";
import { deleteTrip } from "./deleteTrip";
import { undefinedDest } from "./InputTesting/undefinedDest";

export const updateUI = (tripObj) => {
  //recall that the appropriate number of days has already been added to the dataobj.neweatherdata from the server
  if (tripObj.dataObj.fetchedData.city == "noCity") { //if the all of the destination information was undefined
    undefinedDest();
  } else {
    let tripArray = localStorage.getItem("trips");

    const imgHolder = document.querySelector("#img-holder");
    const outputName = document.getElementById("outputName");
    const tripInfo = document.getElementById("tripInfo");
    const outputWeather = document.getElementById("outputWeather");
    let length = vacayLength(tripObj.userDate, tripObj.rtnDate);

    document.getElementById("save-trip").classList.toggle("hidden"); //show the save trip button when the use hits "get weather" button 

    //clears dynmically created text to prepare for new input
    document.getElementById("accordion-holder").innerHTML = "";
    outputName.innerHTML = "";
    tripInfo.innerHTML = "";
    outputWeather.innerHTML = "";
    document.getElementById("save-info").innerHTML = "";
    document.getElementById("text").innerHTML = "";

    let preLoader = document.getElementById("pre-loader-holder");
    imgHolder.style.backgroundImage = `url(${tripObj.dataObj.fetchedData.pixURL})`;
    preLoader.classList.remove("pre-loader");
    let formatDate;
    let formatRtn;
    for (let item in tripObj.dataObj.newWeatherEntry) {

      //--------------dynamically create images from images within a folder----------------------
      let myImg = require.context("../images/icons"); //require.context and then add in the folder that contains the images. Need to do this when you are using mult images in a file
      let weatherIcon = myImg(`./${tripObj.dataObj.newWeatherEntry[item].icon}.png`).default; //note the .default when you are using the images in require.context
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

          if (element == "Snow" || element == "Rain") { //adds the correct units to the weather info
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

    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
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

    //----------------------Create text with user name and trip length--------------------------------------------
    outputName.innerHTML = `Hi, ${tripObj.userName}`;
    if (length == 1) {
      tripInfo.innerHTML = `For your trip to ${tripObj.dataObj.fetchedData.city} starting on ${formatDate}, ending on ${formatRtn}, and lasting ${length} day:`;
    } else {
      tripInfo.innerHTML = `For your trip to ${tripObj.dataObj.fetchedData.city} starting on ${formatDate}, ending on ${formatRtn}, and lasting ${length} days:`;
    }
    outputWeather.innerHTML = `Weather Data`;
    //-----------------------------------------------------------------------------------------------------------

    document.getElementById("save-trip").addEventListener("click", function () {
      persistance(tripObj);
    });

    //----------------Dynamically create a UI delete button-----------------------------------------------
    if (tripObj.delBtn) {
      let newDelBtn = document.createElement("button");
      document.getElementById("delete-holder").innerHTML = ""; //If present, removes the previous delete button so that there is only one in view 
      newDelBtn.id = `delete${tripObj.delBtn}`
      newDelBtn.classList.add("btn-style", "del");
      newDelBtn.innerHTML = `Delete ${tripObj.dataObj.fetchedData.city} Info`;
      document.getElementById("delete-holder").appendChild(newDelBtn);
      document.getElementById(`delete${tripObj.delBtn}`).addEventListener("click", function () {
        deleteTrip(tripArray, tripObj.dataObj.fetchedData.city)
      })
    } else {
      console.log("No delete button was created");
    }
  }
}