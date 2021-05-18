import { PixabayImages } from "../getImages";

export const destValidation = (userDest) => {
  console.log(userDest);
  let counter = 0; 

  for (let location in userDest) {
    if (userDest[location] !== ""){
      console.log("Something is there");
      counter++;
    }
  }

  if (counter == 0) {
    console.log("User did not enter any location information");
    document.getElementById("err-holder").innerHTML = "Please enter your destination city, state, or country. More information will provide more accurate weather data."
    return false;
  } else {
    return true;
  }
}




  // if (!userDest) { //commas are used to separate city, state, country. If ",, " (note space after last comma), then there is no input from user.
  //   
  //   return false;
  // } else {
  //   console.log("true destination");
  //   return true; 
  // }