import {handleSubmit} from "./js/main";
require("./styles/styles.css");
if (localStorage.getItem('trips')) {
  for (let i = 0; i < localStorage.length+1; i++) {
    let savedData = JSON.parse(localStorage.getItem("trips")); //json.parse retrieves the item from storage and converts it to object again 
    console.log(i);
    console.log(savedData[i].fetchedData.city);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.innerHTML = savedData[i].fetchedData.city;
    document.getElementById("saved-div").appendChild(savedBtn);
  }
} else {
  document.getElementById("saved").innerHTML = "You have no saved trips";
};

const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);