
import { updateUI } from "./updateUI";
import { timeDifference } from "./InputTesting/dateValidation";
import { nameValidation } from "./InputTesting/nameValidation";
import { destValidation } from "./InputTesting/destValidation";
import {deleteTrip} from "./deleteTrip";



export const handleSubmit = (e) => {
  e.preventDefault(); //prevent page from reloading on click  
  document.getElementById("err-holder").innerHTML = "";
  let userDate = document.getElementById("leave-date").value;
  let rtnDate = document.getElementById("rtn-date").value;
  let userName = document.getElementById("name").value;
  let userCity = document.getElementById("city").value;
  let userState = document.getElementById("state").value;
  let userCountry = document.getElementById("country").value;
  let userDest = (`${userCity},${userState},${userCountry}`); 
  let outputName = document.getElementById("outputName");

  document.getElementById("save-info").innerHTML = "";

  if (!document.getElementById("delete-trip").classList.contains("hidden")) {
    document.getElementById("delete-trip").classList.toggle("hidden")
  };  //if delete button does not contain the class hidden, then add hidden class so that delete does not show up if we are not looking at saved data. See the opposite if statement in the index.js

  console.log("output name: " + outputName);
  let tripInfo = document.getElementById("tripInfo");
  let outputWeather = document.getElementById("outputWeather");
  document.getElementById("accordion-holder").innerHTML = "";
  outputName.innerHTML = "";
  tripInfo.innerHTML = "";
  outputWeather.innerHTML = "";
  if (!document.getElementById("save-trip").classList.contains("hidden")){
    document.getElementById("save-trip").classList.toggle("hidden");
  }
  
  const imgHolder = document.querySelector("#img-holder");
  imgHolder.style.backgroundImage = ``;

  let interval = timeDifference(userDate, imgHolder);
  let name = nameValidation(userName);
  let destination = destValidation(userCity, imgHolder);

  if (name && interval && destination) {
    imgHolder.style.height = "30vh";
    imgHolder.scrollIntoView({
      block: "center",
      behaviour: "smooth",
      alignToTop: false, 
      inline: "nearest"
    });
    let preLoader = document.getElementById("pre-loader-holder"); //play the loading animation
  preLoader.classList.add("pre-loader");
  document.getElementById("text").innerHTML = "NOW LOADING";

  
    console.log("all is true")
    postData(userDest, interval)
      //.then (coords => weatherbitFetch(coords));
      .then((dataObj) => updateUI(dataObj, userDate, userName, userCity, rtnDate));
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
  console.log(dataObj.newWeatherEntry);

  return (dataObj);
}

// let deleteBtn = document.getElementById("delete-trip");
// deleteBtn.addEventListener("click", deleteTrip);


