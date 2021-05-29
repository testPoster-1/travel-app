export const persistance = (dataObj, userDate, userName, rtnDate) => {
  console.log("persistance ran");

  

  console.log(tripAdd);

  let tripArray = localStorage.getItem('trips') ? (localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 
  console.log("trip array " + tripArray);
  
  let add = addData();
  function addData() {
    for (let trip in tripAdd) {
      console.log(tripAdd.dataObj.fetchedData.city);
      let arraycity = tripAdd.dataObj.fetchedData.city;
    }

  }
  if (add == true) {
    console.log("it's there");
    document.getElementById("save-info").innerHTML = "This trip was previously saved";
  } else {
    tripArray.push(tripAdd);
    localStorage.setItem('trips', JSON.stringify(tripArray));
    const data = JSON.parse(localStorage.getItem('trips'));
    console.log(data);
    document.getElementById("save-info").innerHTML = "Trip saved!";
  }
}
