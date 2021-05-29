import { deleteTrip } from "./js/deleteTrip";
import {handleSubmit} from "./js/main";
import { updateUI } from "./js/updateUI";
require("./styles/styles.css");

if (!localStorage.getItem('trips')) {
  for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //need to JSON.parse the local storage first, then find the length.  
    let savedData = JSON.parse(localStorage.getItem("trips")); //json.parse retrieves the item from storage and converts it to object again 
    console.log(savedData[i].dataObj.fetchedData.city);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.id = (`city${i}`);
    savedBtn.innerHTML = savedData[i].dataObj.fetchedData.city;
    document.getElementById("saved-cities").appendChild(savedBtn);

    savedBtn.addEventListener("click", function (e) {
      updateUI(savedData[i].dataObj, savedData[i].userDate, savedData[i].userName, savedData[i].dataObj.fetchedData.city, savedData[i].rtnDate);
      document.getElementById("save-trip").classList.add("hidden");
      if (document.getElementById("delete-trip").classList.contains("hidden")) {
        document.getElementById("delete-trip").classList.toggle("hidden")
      };//if delete button does contain the class hidden, then toggle hidden class so that delete only shows up if we are looking at saved data. See the opposite if statement in the main.js

      document.getElementById("delete-trip").addEventListener("click", function () {
        deleteTrip(i);
      })
    })
  }
} else {
  document.getElementById("save-text").innerHTML = "You have no saved trips";
};
const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);