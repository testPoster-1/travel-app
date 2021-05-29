import {handleSubmit} from "./js/main";
import { updateUI } from "./js/updateUI";
require("./styles/styles.css");

// localStorage.clear();
if (localStorage.getItem('trips')) {
  for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //NOTE: need to do JSON.parse to get the length into a num versus a string 
    let savedData = JSON.parse(localStorage.getItem("trips")); 
    console.log("savedData = " + savedData[i]);
    console.log(savedData[i].dataObj.fetchedData.city);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.id = (`city${i}`);
    savedBtn.innerHTML = savedData[i].dataObj.fetchedData.city;
    document.getElementById("saved-cities").appendChild(savedBtn);

    savedBtn.addEventListener("click", function (e) {
      updateUI(savedData[i]);
      document.getElementById("save-trip").classList.add("hidden");
      if (document.getElementById(`del-button${i}`).classList.contains("hidden")) {
        document.getElementById(`del-button${i}`).classList.toggle("hidden")
      };//if delete button does contain the class hidden, then toggle hidden class so that delete only shows up if we are looking at saved data. See the opposite if statement in the main.js
    })
  }
} else {
  document.getElementById("save-text").innerHTML = "You have no saved trips";
};
const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);