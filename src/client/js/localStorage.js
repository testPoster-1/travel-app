export const persistance = (tripData) => {
  console.log("persistance ran");

  //tripArray = [];

  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 

  let add = addData();
  function addData() {
    for (let trip in tripArray) {
      console.log(tripArray[trip].fetchedData.city);
      console.log(tripData.fetchedData.city);
      let arraycity = tripArray[trip].fetchedData.city;
      if (arraycity == tripData.fetchedData.city) {
        console.log("I'm there");
        return true;
      }
    }

  }
  if (add == true) {
    console.log("it's there");
    document.getElementById("save-info").innerHTML = "This trip was previously saved";
  } else {
    tripArray.push(tripData);
    localStorage.setItem('trips', JSON.stringify(tripArray));
    const data = JSON.parse(localStorage.getItem('trips'));
    console.log(data);
    document.getElementById("save-info").innerHTML = "Trip saved!";
  }
}
