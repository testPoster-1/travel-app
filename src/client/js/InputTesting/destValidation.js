export const destValidation = (userDest) => {
  console.log(userDest);

  if (!userDest.userCity) {
    console.log("no city");
    document.getElementById("err-holder").innerHTML = "Please enter your destination city. Entering your destination state and country is optional, but will help provide more accurate data.";
    return false;
  } else {
    return true;
  }
}