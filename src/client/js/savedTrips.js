
import { updateUI } from "./updateUI";

export const savedTrips = () => { //creates the buttons for users to get data from saved trips or lets them know there are no saved trips

  let saveText = document.getElementById("save-text");

  if ((!localStorage.getItem('trips')) || JSON.parse(localStorage.getItem('trips')).length == 0) { //the first statement will work if the user has opened the app for the first time and the localstorage will not have been created, yet, and will therefore be undefined. The second statement will work if the user has already utilized local storage (so it is created and no longer undefined), but they have deleted everything so the localstorage is empty with length of 0. Order of statements is important here.  
    saveText.innerHTML = "You have no saved trips";
    
  } else {

    for (let i = 0; i < JSON.parse(localStorage.getItem("trips")).length; i++) { //NOTE: need to do JSON.parse to get the length into a num versus a string 
      let savedData = JSON.parse(localStorage.getItem("trips"));
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

  };
}