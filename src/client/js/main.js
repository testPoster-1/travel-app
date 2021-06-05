import { updateUI } from "./updateUI";
import { timeDifference } from "./InputTesting/dateValidation";
import { nameValidation } from "./InputTesting/nameValidation";
import { destValidation } from "./InputTesting/destValidation";

export const handleSubmit = (e) => {
  e.preventDefault(); //prevent page from reloading on click  

  let userDate = document.getElementById("leave-date").value;
  let rtnDate = document.getElementById("rtn-date").value;
  let userName = document.getElementById("name").value;
  let userCity = document.getElementById("city").value;
  let userState = document.getElementById("state").value;
  let userCountry = document.getElementById("country").value;
  let userDest = (`${userCity},${userState},${userCountry}`);
  const outputName = document.getElementById("outputName");
  const tripInfo = document.getElementById("tripInfo");
  const outputWeather = document.getElementById("outputWeather");
  const imgHolder = document.querySelector("#img-holder");

  //clear any previous information that was dyanmically created to ready the page for new information
  outputName.innerHTML = "";
  tripInfo.innerHTML = "";
  outputWeather.innerHTML = "";
  document.getElementById("err-holder").innerHTML = "";
  document.getElementById("delete-holder").innerHTML = "";
  document.getElementById("save-info").innerHTML = "";
  document.getElementById("accordion-holder").innerHTML = "";
  imgHolder.style.backgroundImage = "";

  if (!document.getElementById("save-trip").classList.contains("hidden")) { //Only shows save trip button if user clicks get weather to get weather data. 
    document.getElementById("save-trip").classList.toggle("hidden");
  }

  // call functions to validate user input and provide users with instructions, if needed 
  let interval = timeDifference(userDate, rtnDate);
  let name = nameValidation(userName);
  let destination = destValidation(userCity);
  
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

    postData(userDest, interval, name, userDate, rtnDate) //see function below 
      .then((tripObj) => updateUI(tripObj)); //use the returned data from the post and send to updateUI function
  }
}

const postData = async (userDest, interval, userName, userDate, rtnDate) => {
  let getData = await fetch("http://localhost:2000/fetchData", {//local server is on port 2000. See POST on server.js with fetchCoords as path
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userDest, interval }) //Notice this was sent as a stringified object
  });
  let dataObj = await getData.json();

  let tripObj = {
    dataObj: dataObj,
    userName: userName,
    userDate: userDate,
    rtnDate: rtnDate
  }
  return (tripObj);  //go back to original function call to use this returned data in the .then chain
}