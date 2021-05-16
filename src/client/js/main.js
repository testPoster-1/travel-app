import { weatherbitFetch } from "./weatherbitFetch";
import { updateUI } from "./updateUI";
import { timeDifference } from "./getTime";
import { PixabayImages } from "./getImages";

export const handleSubmit = (e) => {
  e.preventDefault(); //prevent page from reloading on click  
  let userDate = document.getElementById("leave-date").value;
  let userName = document.getElementById("name").value;
  let userCity = document.getElementById("destination").value;
  let userState = document.getElementById("state").value;
  let userCountry = document.getElementById("country").value;
  let userDest = (`${userCity},${userState},${userCountry}`);
  
  console.log("User clicked submit");
  console.log(`location: ${userDest}`);
  console.log(`Leave Date: ${userDate}`);
  console.log(`name: ${userName}`);

  let dateInterval = timeDifference(userDate);

  if (userDest) {
    
    postData(userDest)
      //.then (coords => weatherbitFetch(coords));
      .then(dataObj => updateUI(dataObj));
  }
}

const postData = async (destination) => {
  let getData = await fetch("http://localhost:2000/fetchData", {//local server is on port 2000. See POST on server.js with fetchCoords as path
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination }) //Notice this was sent as an object
  });
  let dataObj = await getData.json();
  console.log(dataObj);
  return dataObj;
}
