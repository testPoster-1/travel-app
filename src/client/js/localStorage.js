export const persistance = (tripData) => {
  console.log("persistance ran");

  //let tripArray = [];

  let tripArray = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : []; //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 


  if (localStorage.getItem('trips')== (JSON.stringify(tripArray))) {
    console.log("Already there"); 
    console.log(tripArray); 
  } else {
    const data = JSON.parse(localStorage.getItem('trips'));
    // tripArray.push("hello");
 tripArray.push(tripData);
    console.log(tripArray);
    localStorage.setItem('trips', JSON.stringify(tripArray));
    console.log(data);
  }

  localStorage.clear(); 
  console.log("cleared: " + JSON.stringify(tripArray));
}