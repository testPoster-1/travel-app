import {handleSubmit} from "./js/main";
import {savedTrips} from "./js/savedTrips";
require("./styles/styles.css");

savedTrips(); //Calls the savedTrips function to populate the page with buttons to call up previously saved trips or inform the user there are no saved trips. 
const btn = document.getElementById("submit");
btn.addEventListener("click", handleSubmit);  //start here. When user clicks to get weather, go to handleSubmit in main.js. 