import {handleSubmit} from "./js/main";
require("./styles/styles.css");

if (localStorage.getItem('trips')) {
  console.log(localStorage.getItem('trips'));
  for (let i = 0; i < localStorage.length; i++){
    console.log(JSON.stringify(localStorage.getItem(localStorage.key(i))));
  }
  const savedBtn = document.createElement("button");
  savedBtn.classList.add("btn-style", "trip-info");
  savedBtn.innerHTML = "Saved";
  document.getElementById("saved-div").appendChild(savedBtn);
} else {
  document.getElementById("saved").innerHTML = "You have no saved trips";
};

const btn = document.getElementById("submit");

btn.addEventListener("click", handleSubmit);