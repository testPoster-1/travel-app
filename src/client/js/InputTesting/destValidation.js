export const destValidation = (userCity) => {
  let imgHolder = document.querySelector("#img-holder");
  if (userCity) { //if the user entered a city, return true
    return true;
  } else {
      imgHolder.scrollIntoView({ //ask users to at least put in a city  
      block: "center",
      behaviour: "smooth",
      alignToTop: false, 
      inline: "nearest"
    });
    document.getElementById("err-holder").innerHTML = "Please enter your destination city. Entering your destination state and country is optional, but will help provide more accurate data.";
    return false;
  }
} //return to main.js