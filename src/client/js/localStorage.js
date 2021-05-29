export const persistance = (dataObj, userDate, userName, rtnDate) => {
  console.log("persistance ran");

  let trip = {
    dataObj, userDate, userName, rtnDate
  }

  console.log(trip);
  //tripArray = [];

  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 

  let add = addData();
  function addData() {
    for (let trip in tripArray) {
      let arraycity = tripArray[trip].dataObj.fetchedData.city;
      if (arraycity == dataObj.fetchedData.city) {
        console.log("I'm there");
        return true;
      }
    }

  }
  if (add == true) {
    console.log("it's there");
    document.getElementById("save-info").innerHTML = "This trip was previously saved";
  } else {
    tripArray.push(trip);
    localStorage.setItem('trips', JSON.stringify(tripArray));
    const data = JSON.parse(localStorage.getItem('trips'));
    console.log(data);
    document.getElementById("save-info").innerHTML = "Trip saved!";
  }
}
