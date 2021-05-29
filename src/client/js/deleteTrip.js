import { persistance } from "./localStorage";

export const deleteTrip = (tripArray, i) => {
  let obj = JSON.parse(tripArray); //tripArray was sent over as a string since it is localstorage (localstorage is always string). JSON.parse turns it into an obj we can iterate through.
  // let deleteTrip = JSON.parse(localStorage.getItem("trips"))[i];
  if (confirm(`Are you sure you want to delete all of the information for your trip to ${obj[i].dataObj.fetchedData.city}?`)) {
      obj.splice(i,1);
      localStorage.setItem("trips", obj);  

    alert("All of your trips have been deleted");
  };
}