
import { updateUI } from "./updateUI";
import { timeDifference } from "./InputTesting/dateValidation";
import { PixabayImages } from "./getImages";
import { nameValidation } from "./InputTesting/nameValidation";
import { destValidation } from "./InputTesting/destValidation";

export const handleSubmit = (e) => {
  e.preventDefault(); //prevent page from reloading on click  
  document.getElementById("err-holder").innerHTML = "";
  let userDate = document.getElementById("leave-date").value;
  let userName = document.getElementById("name").value;
  let userCity = document.getElementById("city").value;
  let userState = document.getElementById("state").value;
  let userCountry = document.getElementById("country").value;
  let userDest = (`${userCity},${userState},${userCountry}`); 
  
  const imgHolder = document.querySelector("#img-holder");
  imgHolder.style.backgroundImage = ``;

  console.log("User clicked submit");
  console.log(`location: ${userDest}`);
  console.log(`Leave Date: ${userDate}`);
  console.log(`name: ${userName}`);

  let interval = timeDifference(userDate);
  let name = nameValidation(userName);
  let destination = destValidation(userCity);

  if (name && interval && destination) {
    let preLoader = document.getElementById("pre-loader-holder"); //play the loading animation
  preLoader.classList.add("pre-loader");
  let loadCounter = 2;
  document.getElementById("text").innerHTML = "NOW LOADING";

  let loadTimer = setInterval(function(){ //create a setinterval function as a countdown. When countdown reaches 0, the loading animation will be removed. This will coincide with the user info appearing in the UI. 
    if(loadCounter <= 0){
      clearInterval(loadTimer);
      preLoader.classList.remove("pre-loader");
      document.getElementById("text").innerHTML = "";
    } else {
      loadCounter -= 1;
    }
  }, 600);
  
    console.log("all is true")
    postData(userDest, interval)
      //.then (coords => weatherbitFetch(coords));
      .then(dataObj => updateUI(dataObj, imgHolder));
  }
}

const postData = async (userDest, interval) => {
  let getData = await fetch("http://localhost:2000/fetchData", {//local server is on port 2000. See POST on server.js with fetchCoords as path
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userDest, interval}) //Notice this was sent as an object
  });
  let dataObj = await getData.json();
  console.log(`This is my object I am returning: ${JSON.stringify(dataObj)}`);
  return dataObj;
}
