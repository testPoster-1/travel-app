import { savedTrips } from "./savedTrips";

export const persistance = (tripObj) => {
  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 
  console.log("triparray" + tripArray);
  console.log(typeof (tripArray));
  let add = addData(tripObj);

  function addData(tripObj) {
    console.log("addData function ran");
    for (let item in tripArray) {
      console.log("trip" + item);
      let arraycity = tripArray[item].dataObj.fetchedData.city;
      if (arraycity == tripObj.dataObj.fetchedData.city) {
        console.log("I'm there");
        return true;
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


      let buttonObj = { delBtn: `${num}` };

      tripObj = { ...tripObj, ...buttonObj };
      tripArray.push(tripObj);
      localStorage.setItem("trips", JSON.stringify(tripArray));
      console.log("Trip obj: " + JSON.stringify(tripArray));
      document.getElementById("saved-cities").innerHTML = "";
      savedTrips(); 
    }
  
  return tripArray;
}