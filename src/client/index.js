import {handleSubmit} from "./js/main";
import { updateUI } from "./js/updateUI";
require("./styles/styles.css");

if (localStorage.getItem('trips')) {
  console.log(JSON.parse(localStorage.getItem("trips")).length);
  console.log(localStorage.length);
  for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //need to JSON.parse the local storage first, then find the length.  
    let savedData = JSON.parse(localStorage.getItem("trips")); //json.parse retrieves the item from storage and converts it to object again 
    console.log(savedData[i].dataObj.fetchedData.city);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.id = (`city${i}`);
    savedBtn.innerHTML = savedData[i].dataObj.fetchedData.city;
    document.getElementById("saved-cities").appendChild(savedBtn);

    savedBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(savedBtn.id);
      console.log(savedData[i]);
      updateUI(savedData[i].dataObj, savedData[i].userDate, savedData[i].userName, savedData[i].dataObj.fetchedData.city, savedData[i].rtnDate);
    })
    console.log(savedData[i].dataObj, savedData[i].userDate, savedData[i].userName, savedData[i].dataObj.fetchedData.city, savedData[i].rtnDate);
  }

  
 // dataObj, userDate, userName, userCity, rtnDate

} else {
  document.getElementById("save-text").innerHTML = "You have no saved trips";
};
const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);