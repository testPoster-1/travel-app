export const deleteTrip = (tripArray, tripCity) => {
  let obj = JSON.parse(tripArray); //tripArray was sent over as a string since it is localstorage (localstorage is always string). JSON.parse turns it into an obj we can iterate through.
  // let deleteTrip = JSON.parse(localStorage.getItem("trips"))[i];
  console.log(obj, tripCity);
  if (confirm(`Are you sure you want to delete all of the information for your trip to ${tripCity}?`)) {
    for (let item in obj) {
      console.log(obj[item]);
      if (tripCity == obj[item].dataObj.fetchedData.city) {
        console.log("cities matches");
        obj.splice(item,1);
        tripArray = JSON.stringify(obj);
        localStorage.setItem("trips", JSON.stringify(obj));  
      console.log(obj);
      }
    }
    alert(`Your trip to ${tripCity} has been deleted`);
    location.reload(); 
  } else {
    alert("Nothing was deleted");
  };
}