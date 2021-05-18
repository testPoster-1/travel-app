import { weatherbitFetch } from "./weatherbitFetch";
import { updateUI } from "./updateUI";
import { timeDifference } from "./InputTesting/dateValidation";
import { PixabayImages } from "./getImages";
import { nameValidation } from "./InputTesting/nameValidation";
import { destValidation } from "./InputTesting/destValidation";

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

  let interval = timeDifference(userDate);
  let name = nameValidation(userName);
  destValidation(userDest);

  if (userDest && userName && interval) {
    
    postData(userDest, interval)
      //.then (coords => weatherbitFetch(coords));
      .then(dataObj => updateUI(dataObj));
  }
}

const postData = async (destination, interval) => {
  let getData = await fetch("http://localhost:2000/fetchData", {//local server is on port 2000. See POST on server.js with fetchCoords as path
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination, interval }) //Notice this was sent as an object
  });
  let dataObj = await getData.json();
  console.log(`This is my object I am returning: ${JSON.stringify(dataObj)}`);
  return dataObj;
}
