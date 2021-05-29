import {handleSubmit} from "./js/main";
require("./styles/styles.css");
if (localStorage.getItem('trips')) {
  console.log(JSON.parse(localStorage.getItem("trips")).length);
  console.log(localStorage.length);
  for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //need to JSON.parse the local storage first, then find the length.  
    let savedData = JSON.parse(localStorage.getItem("trips")); //json.parse retrieves the item from storage and converts it to object again 
    console.log(savedData[i].fetchedData.city);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.innerHTML = savedData[i].fetchedData.city;
    document.getElementById("saved-cities").appendChild(savedBtn);
  }
} else {
  document.getElementById("saved").innerHTML = "You have no saved trips";
};

const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);