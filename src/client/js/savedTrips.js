
import { updateUI } from "./updateUI";

export const savedTrips = () => {
let saveText = document.getElementById("save-text"); 
if ((localStorage.getItem('trips'))) { 
  for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //NOTE: need to do JSON.parse to get the length into a num versus a string 
    let savedData = JSON.parse(localStorage.getItem("trips")); 
    console.log("length: " + savedData.length);
    console.log(savedData);
    let savedBtn = document.createElement("button");
    savedBtn.classList.add("btn-style", "trip-info");
    savedBtn.id = (`city${i}`);
    savedBtn.innerHTML = savedData[i].dataObj.fetchedData.city;
    document.getElementById("saved-cities").appendChild(savedBtn);

    savedBtn.addEventListener("click", function (e) {
      updateUI(savedData[i]);
      document.getElementById("save-trip").classList.add("hidden");
      // if (!document.getElementById(`delete-${savedData.length-1}`).classList.contains("hidden")) {
      //   document.getElementById(`delete-${savedData.length-1}`).classList.toggle("hidden")
      // };//if delete button does contain the class hidden, then toggle hidden class so that delete only shows up if we are looking at saved data. See the opposite if statement in the main.js
    })
  }
} else {
  saveText.innerHTML = "You have no saved trips";
};
}