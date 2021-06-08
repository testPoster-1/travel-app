import { savedTrips } from "./savedTrips";

export const persistance = (tripObj) => {
  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 
  let add = addData(tripObj);

  function addData(tripObj) {
    console.log("addData function ran");
    for (let item in tripArray) {
      console.log("trip" + item);
      let arraycity = tripArray[item].dataObj.fetchedData.city;
      if (arraycity == tripObj.dataObj.fetchedData.city) {
        console.log("I'm there");
        return true;
      } else {
        return false; 
      }
    }
  }

  if (add == true) {
    console.log("it's there");
    document.getElementById("save-info").innerHTML = "This trip was previously saved";
  } else {
    let num = tripArray.length;
        localStorage.setItem('trips', JSON.stringify(tripArray));
      const data = JSON.parse(localStorage.getItem('trips'));
      console.log("trip array length: " + tripArray.length);
      document.getElementById("save-info").innerHTML = "Trip saved!";

      let buttonObj = { delBtn: `${num}` }; //create a button, but not appending to dom yet. 

      tripObj = { ...tripObj, ...buttonObj }; //add button and button number obj to tripobj
      tripArray.push(tripObj);
      localStorage.setItem("trips", JSON.stringify(tripArray)); //update the localstorage to include the button obj
      console.log("Trip obj: " + JSON.stringify(tripArray));
      document.getElementById("saved-cities").innerHTML = ""; //this clears the saved-cities so that the entire city array can run again and populate with buttons without any repeat. 
      savedTrips(); //creates the buttons for the saved trips
    }
  return tripArray;
}