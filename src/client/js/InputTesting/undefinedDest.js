export const undefinedDest = () => {

  const imgHolder = document.querySelector("#img-holder");
  const tripInfo = document.getElementById("tripInfo");
  const saveTripBtn = document.getElementById("save-trip")

  if (saveTripBtn.classList.contains("hidden")) {
    saveTripBtn.classList.add("hidden"); //show the save trip button when the use hits "get weather" button and the data is defined
  } else {
    saveTripBtn.classList.remove("hidden");
  }

  //clears dynmically created text to prepare for new input
  document.getElementById("text").innerHTML = "";
  document.getElementById("pre-loader-holder").classList.remove("pre-loader");
  imgHolder.style.backgroundImage = `url(https://cdn.pixabay.com/photo/2015/08/05/15/04/mistake-876597_1280.jpg)`;
  tripInfo.innerHTML = `Oops! The destination you entered was not recognized. Please check spelling and try again.`;
}