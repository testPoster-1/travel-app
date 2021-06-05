
import { updateUI } from "./updateUI";

export const savedTrips = () => { //creates the buttons for users to get data from saved trips or lets them know there are no saved trips
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
    })
  }
} else {
  saveText.innerHTML = "You have no saved trips";
};
}