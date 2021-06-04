import {handleSubmit} from "./js/main";
import {savedTrips} from "./js/savedTrips";
require("./styles/styles.css");

//localStorage.clear();
savedTrips(); 
const btn = document.getElementById("submit");
btn.addEventListener("click", handleSubmit);