export const persistance = (tripObj) => {
  console.log("persistance ran");

  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 
  console.log("triparray" + tripArray);
  console.log(typeof(tripArray));
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
    tripArray.push(tripObj);
    localStorage.setItem('trips', JSON.stringify(tripArray));
    const data = JSON.parse(localStorage.getItem('trips'));
    console.log(tripArray);
    document.getElementById("save-info").innerHTML = "Trip saved!";
  }

  return tripArray;
}
