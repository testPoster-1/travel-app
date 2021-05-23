export const destValidation = (userCity, imgHolder) => {
  console.log(userCity);

  if (userCity) {
    return true;
  } else {
    imgHolder.scrollIntoView({
      block: "center",
      behaviour: "smooth",
      alignToTop: false, 
      inline: "nearest"
    });
    document.getElementById("err-holder").innerHTML = "Please enter your destination city. Entering your destination state and country is optional, but will help provide more accurate data.";
    return false;
  }
}